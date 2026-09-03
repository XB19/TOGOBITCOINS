import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { FaWhatsapp, FaArrowUp } from 'react-icons/fa'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'
import Contact from './pages/Contact'
import { whatsappLink } from './data/content'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Retour en haut"
      className={`fixed bottom-24 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-ink text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-bitcoin hover:text-bitcoin ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <FaArrowUp size={16} />
    </button>
  )
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/evenements" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />

      <BackToTop />

      <a
        href={whatsappLink} target="_blank" rel="noreferrer"
        aria-label="Rejoindre WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-bitcoin text-white shadow-xl shadow-bitcoin/30 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-bitcoin/50"
      >
        <FaWhatsapp size={24} />
      </a>
    </div>
  )
}
