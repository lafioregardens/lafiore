import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Existing pages
import Home from './pages/Home'
import BirthMonthFlowers from "./pages/BirthMonthFlowers";
import Cart from "./pages/Cart";
import CustomizeBouquet from "./pages/CustomizeBouquet";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PlantFinder from "./pages/PlantFinder";
import Consultation from './pages/Consultation';
import Shop from "./pages/Shop";

// New pages
import Account from './pages/Account'
import SearchResults from './pages/SearchResults'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import OrderTracking from './pages/OrderTracking'
import TrackingDetails from './pages/TrackingDetails'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminInventory from './pages/admin/AdminInventory'
import AdminOrders from './pages/admin/AdminOrders'
import AdminCustomers from './pages/admin/AdminCustomers'
import AdminStats from './pages/admin/AdminStats'
import AdminNotifications from './pages/admin/AdminNotifications'
import ServiceEventWedding from './pages/ServiceEventWedding'
import ServiceGardenPlanning from './pages/ServiceGardenPlanning'
import ServicePlanteriorDesign from './pages/ServicePlanteriorDesign'

// Components
import Toast from "./components/Toast";
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import Chatbot from './components/Chatbot'
import CoverPage from './components/CoverPage'

// Context
import { AuthProvider } from './context/AuthContext'

function App() {
  const [showCover, setShowCover] = useState(true)

  useEffect(() => {
    // Check if cover was already shown in this session
    const coverShown = sessionStorage.getItem('coverPageShown')
    if (coverShown) {
      setShowCover(false)
    }
  }, [])

  const handleCoverComplete = () => {
    setShowCover(false)
    sessionStorage.setItem('coverPageShown', 'true')
  }

  return (
    <AuthProvider>
      {showCover && <CoverPage onComplete={handleCoverComplete} />}
      <Toast />
      <Chatbot />
      <Routes>
        {/* Existing routes */}
        <Route path="/" element={<Home />} />
        <Route path="/birth-month" element={<BirthMonthFlowers />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/customize" element={<CustomizeBouquet />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/plantfinder" element={<PlantFinder />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/shop" element={<Shop />} />

        {/* New routes */}
        <Route path="/search" element={<SearchResults />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/tracking" element={<OrderTracking />} />
        <Route path="/tracking/:orderId" element={<TrackingDetails />} />
        <Route path="/service/event-wedding" element={<ServiceEventWedding />} />
        <Route path="/service/garden-planning" element={<ServiceGardenPlanning />} />
        <Route path="/service/planterior-design" element={<ServicePlanteriorDesign />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/inventory"
          element={
            <AdminRoute>
              <AdminInventory />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <AdminRoute>
              <AdminCustomers />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/stats"
          element={
            <AdminRoute>
              <AdminStats />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/notifications"
          element={
            <AdminRoute>
              <AdminNotifications />
            </AdminRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App