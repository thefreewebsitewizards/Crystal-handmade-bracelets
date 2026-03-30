import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ProductProvider } from './context/ProductContext'
import { AdminAuthProvider } from './context/AdminAuthContext'
import Layout from './components/Layout'
import RequireAdmin from './components/RequireAdmin'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import AdminPage from './pages/AdminPage'
import AdminSignInPage from './pages/AdminSignInPage'

function App() {
  return (
    <AdminAuthProvider>
      <ProductProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:categoryId" element={<ProductsPage />} />
                <Route path="/product/:productId" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/admin/sign-in" element={<AdminSignInPage />} />
                <Route
                  path="/admin"
                  element={(
                    <RequireAdmin>
                      <AdminPage />
                    </RequireAdmin>
                  )}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ProductProvider>
    </AdminAuthProvider>
  )
}

export default App
