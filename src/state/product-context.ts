import { createContext } from 'react'
import type { Product } from '../data'

export interface ProductContextType {
  products: Product[]
  loading: boolean
  error: string | null
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  getProductsByCategory: (categoryId: string) => Product[]
  getProductById: (id: string) => Product | undefined
}

export const ProductContext = createContext<ProductContextType | null>(null)
