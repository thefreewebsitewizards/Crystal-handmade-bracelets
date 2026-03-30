import { createContext } from 'react'
import type { User } from 'firebase/auth'

export interface AdminAuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  isAdmin: boolean
  storeId: string
  signIn: (email: string, password: string) => Promise<boolean>
  signOutUser: () => Promise<void>
}

export const AdminAuthContext = createContext<AdminAuthContextType | null>(null)
