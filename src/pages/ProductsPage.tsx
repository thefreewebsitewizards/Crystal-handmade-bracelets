import { useParams, Link } from 'react-router-dom'
import { getCategoryById } from '../data'
import { useProducts } from '../context/ProductContext'
import PageHeader from '../components/PageHeader'

export default function ProductsPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const category = getCategoryById(categoryId || '')
  const { getProductsByCategory } = useProducts()
  const products = getProductsByCategory(categoryId || '')

  if (!category) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🔍</div>
        <h2>Category Not Found</h2>
        <p>This category doesn't exist or has been removed.</p>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    )
  }

  return (
    <>
      {/* Category Banner */}
      <div className="category-banner">
        <img src={category.image} alt={category.title} className="category-banner-img" />
        <div className="category-banner-overlay" />
      </div>

      <div className="page-content">
        <PageHeader title={category.title} subtitle={category.description} />

        {products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">✨</div>
            <h2>Coming Soon</h2>
            <p>New products will be added here soon. Check back later!</p>
            <Link to="/" className="btn-primary">Back to Home</Link>
          </div>
        ) : (
          <div className="product-grid">
            {products.map(product => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="product-card"
              >
                <div className="product-card-img-wrap">
                  <img src={product.image} alt={product.name} loading="lazy" />
                </div>
                <div className="product-card-info">
                  <h3 className="product-card-name">{product.name}</h3>
                  <span className="product-card-price">{product.priceLabel}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
