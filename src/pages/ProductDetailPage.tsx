import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCategoryById } from '../data'
import { useCart } from '../context/CartContext'
import { useProducts } from '../context/ProductContext'
import PageHeader from '../components/PageHeader'

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>()
  const { getProductById } = useProducts()
  const product = getProductById(productId || '')
  const category = product ? getCategoryById(product.categoryId) : undefined
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="page-content">
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h2>Product Not Found</h2>
          <p>This product doesn't exist or has been removed.</p>
          <Link to="/" className="btn-primary">Back to Home</Link>
        </div>
      </div>
    )
  }

  function handleAddToCart() {
    if (!product) return
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="page-content">
      <PageHeader
        title={category?.title || 'Product'}
        subtitle="Product Details"
      />

      <div className="product-detail">
        {/* Image */}
        <div className="product-detail-img-wrap">
          <img src={product.image} alt={product.name} />
        </div>

        {/* Info */}
        <div className="product-detail-info">
          <h1 className="product-detail-name">{product.name}</h1>
          <div className="product-detail-price">{product.priceLabel}</div>

          <div className="product-detail-divider" />

          <p className="product-detail-desc">{product.description}</p>

          <div className="product-detail-divider" />

          {/* Quantity */}
          <div className="qty-section">
            <label className="qty-label">Quantity</label>
            <div className="qty-controls">
              <button
                className="qty-btn"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /></svg>
              </button>
              <span className="qty-value">{quantity}</span>
              <button
                className="qty-btn"
                onClick={() => setQuantity(q => q + 1)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            className={`btn-add-cart ${added ? 'btn-added' : ''}`}
            onClick={handleAddToCart}
          >
            {added ? (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                Added to Cart!
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                Add to Cart — ${(product.price * quantity).toFixed(2)}
              </>
            )}
          </button>

          {/* Policies */}
          <div className="product-policies">
            <div className="product-policy">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
              Ships within US only
            </div>
            <div className="product-policy">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              All sales are final
            </div>
            <div className="product-policy">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.067 8.478c.492.876.492 2.164 0 3.304-.983 2.273-3.638 3.775-6.927 3.775h-.498a.805.805 0 0 0-.794.676l-.04.227-.5 3.176-.02.124a.805.805 0 0 1-.794.676h-2.6a.483.483 0 0 1-.477-.558l.156-.99.152-.963c.084-.534.554-.94 1.094-.94h.346c3.89 0 6.932-1.58 7.822-6.153.37-1.907.178-3.497-.92-4.354z" /><path d="M17.127 5.678c-.985-.442-2.262-.678-3.694-.678H8.29a.805.805 0 0 0-.794.676L5.535 17.39a.483.483 0 0 0 .477.558h3.465l.87-5.516-.027.173a.805.805 0 0 1 .794-.676h1.653c3.248 0 5.79-1.319 6.531-5.134.022-.113.04-.222.056-.328-.188-.099-.188-.099 0 0-.222-1.46-1.456-2.316-2.227-2.788z" /></svg>
              Pay with PayPal
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
