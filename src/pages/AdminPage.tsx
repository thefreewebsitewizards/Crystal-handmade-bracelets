import { useState } from 'react'
import { useProducts } from '../context/ProductContext'
import { categories, type Product } from '../data'
import PageHeader from '../components/PageHeader'
import ProductModal from '../components/ProductModal'

export default function AdminPage() {
  const { products, deleteProduct } = useProducts()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  function handleAddNew() {
    setEditingProduct(null)
    setModalOpen(true)
  }

  function handleEdit(product: Product) {
    setEditingProduct(product)
    setModalOpen(true)
  }

  function handleDelete(id: string) {
    if (window.confirm('Are you sure you want to delete this product? This cannot be undone.')) {
      deleteProduct(id)
    }
  }

  return (
    <div className="page-content admin-page">
      <div className="admin-header-row">
        <PageHeader title="Admin Dashboard" subtitle="Manage your products and inventory" />
        <button className="btn-primary" onClick={handleAddNew}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Product
        </button>
      </div>

      <div className="admin-list">
        <div className="admin-list-header">
          <div className="admin-col col-img">Image</div>
          <div className="admin-col col-name">Product Name</div>
          <div className="admin-col col-cat">Category</div>
          <div className="admin-col col-price">Price</div>
          <div className="admin-col col-actions">Actions</div>
        </div>

        <div className="admin-list-body">
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
                  <button className="admin-action-btn delete" onClick={() => handleDelete(product.id)} title="Delete">
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
    </div>
  )
}
