import { useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import { categories, type Product } from '../data'
import PageHeader from '../components/PageHeader'
import ProductModal from '../components/ProductModal'
import { useAdminAuth } from '../hooks/useAdminAuth'

export default function AdminPage() {
  const { products, loading, error, deleteProduct } = useProducts()
  const { signOutUser } = useAdminAuth()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)
  const [deleteCandidate, setDeleteCandidate] = useState<Product | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [confirmSignOut, setConfirmSignOut] = useState(false)
  const [signingOut, setSigningOut] = useState(false)

  function handleAddNew() {
    setEditingProduct(null)
    setModalOpen(true)
  }

  function handleEdit(product: Product) {
    setEditingProduct(product)
    setModalOpen(true)
  }

  async function handleDelete() {
    if (!deleteCandidate) return
    try {
      setDeleting(true)
      setActionError(null)
      await deleteProduct(deleteCandidate.id)
      setDeleteCandidate(null)
    } catch {
      setActionError('Unable to delete product. Please try again.')
    } finally {
      setDeleting(false)
    }
  }

  async function handleSignOut() {
    try {
      setSigningOut(true)
      await signOutUser()
      setConfirmSignOut(false)
    } finally {
      setSigningOut(false)
    }
  }

  return (
    <div className="page-content admin-page">
      <div className="admin-header-row">
        <PageHeader title="Admin Dashboard" subtitle="Manage your products and inventory" />
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-secondary" onClick={() => setConfirmSignOut(true)}>
            Sign Out
          </button>
          <button className="btn-primary" onClick={handleAddNew}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Product
          </button>
        </div>
      </div>
      {(actionError || error) && <div className="admin-empty" style={{ marginBottom: 16 }}>{actionError || error}</div>}

      <div className="admin-list">
        <div className="admin-list-header">
          <div className="admin-col col-img">Image</div>
          <div className="admin-col col-name">Product Name</div>
          <div className="admin-col col-cat">Category</div>
          <div className="admin-col col-price">Price</div>
          <div className="admin-col col-actions">Actions</div>
        </div>

        <div className="admin-list-body">
          {loading && (
            <div className="admin-empty">Loading products...</div>
          )}
          {products.map(product => {
            const cat = categories.find(c => c.id === product.categoryId)
            return (
              <div key={product.id} className="admin-list-row">
                <div className="admin-col col-img">
                  <div className="admin-thumbnail">
                    <img src={product.image} alt={product.name} />
                  </div>
                </div>
                <div className="admin-col col-name">{product.name}</div>
                <div className="admin-col col-cat">
                  <span className="admin-badge">{cat?.title || 'Unknown'}</span>
                </div>
                <div className="admin-col col-price">${product.price.toFixed(2)}</div>
                <div className="admin-col col-actions">
                  <button className="admin-action-btn edit" onClick={() => handleEdit(product)} title="Edit">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button className="admin-action-btn delete" onClick={() => setDeleteCandidate(product)} title="Delete">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                  </button>
                </div>
              </div>
            )
          })}
          {products.length === 0 && (
            <div className="admin-empty">No products found. Add one to get started!</div>
          )}
        </div>
      </div>

      {modalOpen && (
        <ProductModal
          product={editingProduct}
          onClose={() => setModalOpen(false)}
        />
      )}

      {deleteCandidate && (
        <div className="modal-overlay" onClick={() => !deleting && setDeleteCandidate(null)}>
          <div className="modal-content confirm-delete-modal" onClick={(event) => event.stopPropagation()}>
            <div className="confirm-delete-body">
              <div className="confirm-delete-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </div>
              <h3>Delete product?</h3>
              <p>
                You are about to permanently delete <span>{deleteCandidate.name}</span>.
                This action cannot be undone.
              </p>
            </div>
            <div className="confirm-delete-actions">
              <button type="button" className="btn-secondary" onClick={() => setDeleteCandidate(null)} disabled={deleting}>
                Cancel
              </button>
              <button type="button" className="btn-primary confirm-delete-btn" onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmSignOut && (
        <div className="modal-overlay" onClick={() => !signingOut && setConfirmSignOut(false)}>
          <div className="modal-content confirm-signout-modal" onClick={(event) => event.stopPropagation()}>
            <div className="confirm-signout-body">
              <div className="confirm-signout-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              </div>
              <h3>Sign out now?</h3>
              <p>Your admin session will end and you will be redirected to sign in again to manage products.</p>
            </div>
            <div className="confirm-signout-actions">
              <button type="button" className="btn-secondary" onClick={() => setConfirmSignOut(false)} disabled={signingOut}>
                Cancel
              </button>
              <button type="button" className="btn-primary confirm-signout-btn" onClick={handleSignOut} disabled={signingOut}>
                {signingOut ? 'Signing out...' : 'Yes, Sign Out'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
