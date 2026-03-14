import { Link } from 'react-router-dom'
import { categories } from '../data'

/* ===== Store Hero Banner ===== */
function StoreHero() {
  return (
    <div className="store-hero">
      <div className="hero-orb" style={{ width: 300, height: 300, top: -50, left: '10%', background: 'radial-gradient(circle, #a855f7, transparent)' }} />
      <div className="hero-orb" style={{ width: 250, height: 250, top: -30, right: '15%', background: 'radial-gradient(circle, #ec4899, transparent)', animationDelay: '-4s' }} />
      <div className="hero-orb" style={{ width: 200, height: 200, bottom: 20, left: '40%', background: 'radial-gradient(circle, #3b82f6, transparent)', animationDelay: '-8s' }} />
      <div className="hero-orb" style={{ width: 180, height: 180, top: 10, left: '60%', background: 'radial-gradient(circle, #f97316, transparent)', animationDelay: '-6s' }} />
      <div className="hero-orb" style={{ width: 160, height: 160, bottom: 0, left: '20%', background: 'radial-gradient(circle, #22d3ee, transparent)', animationDelay: '-10s' }} />
    </div>
  )
}

/* ===== Store Profile ===== */
function StoreProfile() {
  return (
    <div className="store-profile">
      <div className="store-avatar">D</div>
      <h1 className="store-name">Ditto's Handmade Crafts</h1>
      <p className="store-tagline">Handmade with love in Vermont — keychains, beaded pens, bracelets & more</p>
      <div className="store-meta">
        <span className="store-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Middlebury, VT
        </span>
        <span className="store-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
          Ships in US
        </span>
        <span className="store-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Handcrafted
        </span>
      </div>
    </div>
  )
}

/* ===== Category Card ===== */
function CategoryCard({ cat }: { cat: typeof categories[0] }) {
  const isComingSoon = cat.priceLabel === 'Coming Soon'
  const isCustom = cat.id === 'custom'

  const card = (
    <div className={`cat-card ${isComingSoon ? 'cat-card-disabled' : ''}`}>
      <div className="cat-card-img-wrap">
        <img src={cat.image} alt={cat.title} loading="lazy" />
      </div>
      <div className="cat-card-info">
        <div className="cat-card-title">{cat.title}</div>
        <div className="cat-card-price">{cat.priceLabel}</div>
      </div>
      {!isComingSoon && (
        <div className="cat-card-accent">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      )}
      {isComingSoon && (
        <div className="cat-card-accent" style={{ opacity: 1, transform: 'scale(1)', background: 'rgba(255,255,255,0.08)', border: 'none' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
      )}
    </div>
  )

  if (isComingSoon) return card
  if (isCustom) {
    return (
      <a href="mailto:crystalporey@gmail.com?subject=Custom%20Order%20Request" style={{ textDecoration: 'none' }}>
        {card}
      </a>
    )
  }

  return <Link to={`/category/${cat.id}`} style={{ textDecoration: 'none' }}>{card}</Link>
}

/* ===== About Section ===== */
function AboutSection() {
  return (
    <div className="about-section">
      <div className="about-card">
        <div className="about-header">
          <div className="about-avatar">C</div>
          <div>
            <div className="about-name">Crystal Porey</div>
            <div className="about-role">Maker & Owner</div>
          </div>
        </div>
        <div className="about-text">
          <p>I have always loved making things with my hands but never thought I could make a living from it. As an adult I had 2 boys that are now in their 20's and are amazing men.</p>
          <p>Now in my late 40's I have decided it's time to make the dream of being my own boss a reality. When I started thinking about a name for my shop the only thing that came to mind is the name my baby brother gave me when he was little.</p>
          <p>So <span className="about-highlight">Ditto's Handmade Crafts</span> is born. I currently live in the Middlebury, VT area but love spending my time with my loving family in MA.</p>
        </div>
      </div>
    </div>
  )
}

/* ===== Footer ===== */
function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="sidebar-logo" style={{ width: 32, height: 32, fontSize: 14, borderRadius: 8 }}>D</div>
            <span style={{ fontWeight: 700, fontSize: 16 }}>Ditto's Handmade Crafts</span>
          </div>
          <p className="footer-brand-text">Every piece is handmade and one of a kind. Crafted with love in Middlebury, Vermont.</p>
        </div>
        <div>
          <h4 className="footer-heading">Shop</h4>
          <ul className="footer-links">
            <li><Link to="/category/keychains">Mystery Keychains</Link></li>
            <li><Link to="/category/pens">Beaded Pens</Link></li>
            <li><Link to="/category/bracelet-combo">Bracelet Combos</Link></li>
            <li><a href="mailto:crystalporey@gmail.com?subject=Custom%20Order%20Request">Custom Orders</a></li>
          </ul>
        </div>
        <div>
          <h4 className="footer-heading">Connect</h4>
          <ul className="footer-links">
            <li>
              <a href="https://www.facebook.com/profile.php?id=61574438498498" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                Facebook
              </a>
            </li>
            <li>
              <a href="mailto:crystalporey@gmail.com">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                crystalporey@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:8029899913">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 4.11 4.18 2 2 0 0 1 6.09 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L10.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                (802) 989-9913
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="footer-heading">Policies</h4>
          <ul className="footer-links">
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }}><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
              Ships within US only
            </li>
            <li>All sales are final</li>
            <li>Tax & shipping at checkout</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© 2026 Ditto's Handmade Crafts. All rights reserved.</span>
        <span className="paypal-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.067 8.478c.492.876.492 2.164 0 3.304-.983 2.273-3.638 3.775-6.927 3.775h-.498a.805.805 0 0 0-.794.676l-.04.227-.5 3.176-.02.124a.805.805 0 0 1-.794.676h-2.6a.483.483 0 0 1-.477-.558l.156-.99.152-.963c.084-.534.554-.94 1.094-.94h.346c3.89 0 6.932-1.58 7.822-6.153.37-1.907.178-3.497-.92-4.354z" />
            <path d="M17.127 5.678c-.985-.442-2.262-.678-3.694-.678H8.29a.805.805 0 0 0-.794.676L5.535 17.39a.483.483 0 0 0 .477.558h3.465l.87-5.516-.027.173a.805.805 0 0 1 .794-.676h1.653c3.248 0 5.79-1.319 6.531-5.134.022-.113.04-.222.056-.328-.188-.099-.188-.099 0 0-.222-1.46-1.456-2.316-2.227-2.788z" />
          </svg>
          PayPal Accepted
        </span>
      </div>
    </footer>
  )
}

/* ===== Home Page ===== */
export default function HomePage() {
  return (
    <>
      <StoreHero />
      <StoreProfile />

      <h2 id="shop" className="section-title">Shop by Category</h2>
      <div className="category-grid">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} cat={cat} />
        ))}
      </div>

      <h2 className="section-title">About the Maker</h2>
      <AboutSection />
      <SiteFooter />
    </>
  )
}
