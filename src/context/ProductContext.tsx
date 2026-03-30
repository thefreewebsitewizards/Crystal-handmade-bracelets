import { useEffect, useState, type ReactNode } from 'react'
import { collection, onSnapshot, query } from 'firebase/firestore'
import type { Product } from '../data'
import { callFunction, db } from '../lib/firebase'
import { STORE_ID } from '../lib/store'
import { ProductContext } from '../state/product-context'

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(Boolean(STORE_ID))
  const [error, setError] = useState<string | null>(STORE_ID ? null : 'Missing store configuration.')

  useEffect(() => {
    if (!STORE_ID) {
      return
    }

    const productsRef = collection(db, 'stores', STORE_ID, 'products')
    const q = query(productsRef)
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const mappedProducts = snapshot.docs.map((doc) => {
          const data = doc.data() as Partial<Product>
          const price = typeof data.price === 'number' ? data.price : Number(data.price || 0)
          return {
            id: data.id || doc.id,
            categoryId: data.categoryId || '',
            name: data.name || '',
            description: data.description || '',
            price,
            priceLabel: data.priceLabel || `$${price.toFixed(2)}`,
            image: data.image || '',
          } satisfies Product
        })

        setProducts(mappedProducts)
        setError(null)
        setLoading(false)
      },
      () => {
        setError('Unable to load products.')
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [])

  async function addProduct(productData: Omit<Product, 'id'>) {
    if (!STORE_ID) throw new Error('Missing store configuration.')
    await callFunction('addProduct', { storeId: STORE_ID, productData })
  }

  async function updateProduct(id: string, updates: Partial<Product>) {
    if (!STORE_ID) throw new Error('Missing store configuration.')
    await callFunction('updateProduct', { storeId: STORE_ID, productId: id, updates })
  }

  async function deleteProduct(id: string) {
    if (!STORE_ID) throw new Error('Missing store configuration.')
    await callFunction('deleteProduct', { storeId: STORE_ID, productId: id })
  }

  function getProductsByCategory(categoryId: string) {
    return products.filter(p => p.categoryId === categoryId)
  }

  function getProductById(id: string) {
    return products.find(p => p.id === id)
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductsByCategory,
        getProductById
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
