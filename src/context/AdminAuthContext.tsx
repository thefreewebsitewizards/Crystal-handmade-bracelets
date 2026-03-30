import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getIdTokenResult, onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth'
import { auth, callFunction } from '../lib/firebase'
import { STORE_ID } from '../lib/store'
import { AdminAuthContext, type AdminAuthContextType } from '../state/admin-auth-context'

interface AdminClaims {
  role?: string
  storeId?: string
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [claims, setClaims] = useState<AdminClaims | null>(null)
  const [loading, setLoading] = useState(Boolean(STORE_ID))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!STORE_ID) {
      setError('Missing store configuration.')
    }
  }, [])

  const refreshClaims = useCallback(async (targetUser: User) => {
    const tokenResult = await getIdTokenResult(targetUser, true)
    const nextClaims = tokenResult.claims as AdminClaims
    setClaims(nextClaims)
    return nextClaims
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser)
      if (!nextUser) {
        setClaims(null)
        setError(null)
        setLoading(false)
        return
      }

      try {
        await refreshClaims(nextUser)
        setError(null)
      } catch {
        setError('Unable to verify admin access.')
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [refreshClaims])

  const signInUser = useCallback(
    async (email: string, password: string) => {
      setError(null)
      const credential = await signInWithEmailAndPassword(auth, email, password)
      const hasAdminAccess = (tokenClaims: AdminClaims) =>
        tokenClaims.role === 'admin' &&
        Boolean(tokenClaims.storeId) &&
        Boolean(STORE_ID) &&
        tokenClaims.storeId === STORE_ID
      let nextClaims = await refreshClaims(credential.user)
      let hasAccess = hasAdminAccess(nextClaims)

      if (!hasAccess && STORE_ID) {
        try {
          await callFunction<{ success?: boolean }>('bootstrapAdminClaims', { storeId: STORE_ID })
          nextClaims = await refreshClaims(credential.user)
          hasAccess = hasAdminAccess(nextClaims)
        } catch {
          hasAccess = false
        }
      }

      if (!hasAccess) {
        await signOut(auth)
        setError('This account does not have admin access for this store.')
      }

      return hasAccess
    },
    [refreshClaims],
  )

  const signOutUser = useCallback(async () => {
    await signOut(auth)
  }, [])

  const isAdmin =
    Boolean(user) &&
    Boolean(claims) &&
    claims?.role === 'admin' &&
    Boolean(claims?.storeId) &&
    Boolean(STORE_ID) &&
    claims?.storeId === STORE_ID

  const value = useMemo<AdminAuthContextType>(
    () => ({
      user,
      loading,
      error,
      isAdmin,
      storeId: STORE_ID,
      signIn: signInUser,
      signOutUser,
    }),
    [user, loading, error, isAdmin, signInUser, signOutUser],
  )

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}
