import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import PageHeader from '../components/PageHeader'

export default function CartPage() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="page-content">
        <PageHeader title="Your Cart" />
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Browse our handmade crafts and add something special!</p>
          <Link to="/" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  const shipping = 5.99
  const taxRate = 0.06
  const tax = total * taxRate
  const grandTotal = total + shipping + tax

  return (
    <div className="page-content">
      <PageHeader title="Your Cart" subtitle={`${items.length} item${items.length > 1 ? 's' : ''} in your cart`} />

      <div className="cart-layout">
        {/* Cart Items */}
        <div className="cart-items">
          {items.map(item => (
            <div className="cart-item" key={item.product.id}>
              <Link to={`/product/${item.product.id}`} className="cart-item-img-wrap">
                <img src={item.product.image} alt={item.product.name} />
              </Link>

              <div className="cart-item-details">
                <Link to={`/product/${item.product.id}`} className="cart-item-name">
                  {item.product.name}
                </Link>
                <div className="cart-item-price">{item.product.priceLabel} each</div>
              </div>

              <div className="cart-item-actions">
                <div className="qty-controls qty-controls-sm">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  </button>
                </div>
                <div className="cart-item-total">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeItem(item.product.id)}
                  aria-label="Remove item"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          <button className="cart-clear-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h3 className="order-summary-title">Order Summary</h3>

          <div className="order-summary-rows">
            <div className="order-summary-row">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="order-summary-row">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="order-summary-row">
              <span>Estimated Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="order-summary-divider" />
            <div className="order-summary-row order-summary-total">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <a
            href={`https://www.paypal.com/paypalme/CrystalPorey/${grandTotal.toFixed(2)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-checkout"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.067 8.478c.492.876.492 2.164 0 3.304-.983 2.273-3.638 3.775-6.927 3.775h-.498a.805.805 0 0 0-.794.676l-.04.227-.5 3.176-.02.124a.805.805 0 0 1-.794.676h-2.6a.483.483 0 0 1-.477-.558l.156-.99.152-.963c.084-.534.554-.94 1.094-.94h.346c3.89 0 6.932-1.58 7.822-6.153.37-1.907.178-3.497-.92-4.354z" />
              <path d="M17.127 5.678c-.985-.442-2.262-.678-3.694-.678H8.29a.805.805 0 0 0-.794.676L5.535 17.39a.483.483 0 0 0 .477.558h3.465l.87-5.516-.027.173a.805.805 0 0 1 .794-.676h1.653c3.248 0 5.79-1.319 6.531-5.134.022-.113.04-.222.056-.328-.188-.099-.188-.099 0 0-.222-1.46-1.456-2.316-2.227-2.788z" />
            </svg>
            Checkout with PayPal
          </a>

          <p className="order-summary-note">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }}><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
            Ships within US only · All sales are final
          </p>

          <Link to="/" className="cart-continue-link">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
