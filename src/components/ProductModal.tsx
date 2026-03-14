import { useState, useEffect } from 'react'
import { useProducts } from '../context/ProductContext'
import { categories, type Product } from '../data'

interface ProductModalProps {
  product?: Product | null
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addProduct, updateProduct } = useProducts()

  const [formData, setFormData] = useState({
    name: '',
    categoryId: categories[0].id,
    description: '',
    price: '',
    priceLabel: '',
    image: '/assets/react.svg' // default placeholder
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        categoryId: product.categoryId,
        description: product.description,
        price: product.price.toString(),
        priceLabel: product.priceLabel,
        image: product.image
      })
    }
  }, [product])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const newProductData = {
      name: formData.name,
      categoryId: formData.categoryId,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      priceLabel: formData.priceLabel || `$${parseFloat(formData.price).toFixed(2)}`,
      image: formData.image
    }

    if (product) {
      updateProduct(product.id, newProductData)
    } else {
      addProduct(newProductData)
    }
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Mystery Beaded Pen - Deluxe"
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={formData.categoryId}
              onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.title}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the product..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
              />
            </div>
            <div className="form-group">
              <label>Price Label (Optional)</label>
              <input
                type="text"
                value={formData.priceLabel}
                onChange={e => setFormData({ ...formData, priceLabel: e.target.value })}
                placeholder="e.g. $25 per set"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Image URL / Path</label>
            <input
              type="text"
              required
              value={formData.image}
              onChange={e => setFormData({ ...formData, image: e.target.value })}
              placeholder="/src/assets/your-image.png or https://..."
            />
            <small className="form-hint">For now, use absolute image URLs or paths to existing assets.</small>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">
              {product ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
