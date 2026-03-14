import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { products as initialProducts, type Product, getCategoryById } from '../data'

interface ProductContextType {
  products: Product[]
  addProduct: (product: Omit<Product, 'id'>) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void
  getProductsByCategory: (categoryId: string) => Product[]
  getProductById: (id: string) => Product | undefined
}

const ProductContext = createContext<ProductContextType | null>(null)

const STORAGE_KEY = 'dittos-products'

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return JSON.parse(raw)
    } catch { /* ignore */ }
    return initialProducts
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  }, [products])

  function addProduct(productData: Omit<Product, 'id'>) {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    }
    setProducts(prev => [...prev, newProduct])
  }

  function updateProduct(id: string, updates: Partial<Product>) {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  function deleteProduct(id: string) {
    setProducts(prev => prev.filter(p => p.id !== id))
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

export function useProducts() {
  const ctx = useContext(ProductContext)
  if (!ctx) throw new Error('useProducts must be used within ProductProvider')
  return ctx
}
