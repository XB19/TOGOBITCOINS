import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './lib/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import EventsAdmin from './pages/EventsAdmin'
import PartnersAdmin from './pages/PartnersAdmin'
import PagesAdmin from './pages/PagesAdmin'
import ContactAdmin from './pages/ContactAdmin'

function Protected({ children }) {
  const { authenticated } = useAuth()
  if (authenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-gray-400">Chargement…</div>
    )
  }
  if (!authenticated) return <Navigate to="/login" replace />
  return children
}

function AppRoutes() {
  const { authenticated } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={authenticated ? <Navigate to="/" replace /> : <Login />} />
      <Route
        element={
          <Protected>
            <Layout />
          </Protected>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/evenements" element={<EventsAdmin />} />
        <Route path="/partenaires" element={<PartnersAdmin />} />
        <Route path="/pages" element={<PagesAdmin />} />
        <Route path="/contact" element={<ContactAdmin />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
