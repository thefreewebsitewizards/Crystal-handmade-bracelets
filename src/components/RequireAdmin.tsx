import { Navigate, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../hooks/useAdminAuth'
import type { ReactNode } from 'react'

export default function RequireAdmin({ children }: { children: ReactNode }) {
  const { loading, isAdmin } = useAdminAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="page-content">
        <div className="empty-state">
          <h2>Checking admin access...</h2>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return <Navigate to="/admin/sign-in" replace state={{ from: location.pathname }} />
  }

  return <>{children}</>
}
