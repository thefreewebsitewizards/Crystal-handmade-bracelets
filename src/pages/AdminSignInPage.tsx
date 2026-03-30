import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../hooks/useAdminAuth'
import PageHeader from '../components/PageHeader'

export default function AdminSignInPage() {
  const { isAdmin, loading, error, signIn, user, signOutUser, storeId } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const nextPath = (location.state as { from?: string } | null)?.from || '/admin'

  if (loading) {
    return (
      <div className="page-content">
        <div className="empty-state">
          <h2>Checking session...</h2>
        </div>
      </div>
    )
  }

  if (isAdmin) {
    return <Navigate to={nextPath} replace />
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setMessage(null)

    try {
      const hasAccess = await signIn(email, password)
      if (hasAccess) {
        navigate(nextPath, { replace: true })
        return
      }
      setMessage('This account is not configured as an admin for this store.')
    } catch {
      setMessage('Sign-in failed. Please check your email and password.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page-content">
      <PageHeader title="Admin Sign In" subtitle="Sign in with your Firebase admin account" />

      <div className="admin-auth-card">
        <form className="admin-auth-form" onSubmit={handleSubmit}>
          <label className="admin-auth-label">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@store.com"
              className="admin-auth-input"
            />
          </label>

          <label className="admin-auth-label">
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="admin-auth-input"
            />
          </label>

          {!storeId && <div className="admin-auth-error">Missing VITE_STORE_ID in environment configuration.</div>}
          {(message || error) && <div className="admin-auth-error">{message || error}</div>}

          <button type="submit" className="btn-primary admin-auth-submit" disabled={submitting || !storeId}>
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {user && (
          <button type="button" className="btn-secondary admin-auth-signout" onClick={signOutUser}>
            Sign Out Current User
          </button>
        )}
      </div>
    </div>
  )
}
