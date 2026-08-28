import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa'
import { whatsappLink } from '../data/content'
import logo from '../assets/logo.png'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/evenements', label: 'Événements' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b border-black/5 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-md shadow-black/5' : ''
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <NavLink to="/" className="group flex items-center">
          <img
            src={logo}
            alt="Togo Bitcoin Community"
            className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </NavLink>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive ? 'text-bitcoin-dark' : 'text-gray-600 hover:text-ink'
                } group`
              }
            >
              {link.label}
              <span className="pointer-events-none absolute inset-x-4 bottom-1 h-px scale-x-0 bg-bitcoin transition-transform duration-300 group-hover:scale-x-100" />
            </NavLink>
          ))}
          <a
            href={whatsappLink}
            className="ml-3 inline-flex items-center gap-2 rounded-full bg-bitcoin px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-bitcoin/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-bitcoin/40"
          >
            <FaWhatsapp size={16} />
            Rejoindre
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-ink transition-colors hover:border-bitcoin hover:text-bitcoin-dark md:hidden"
          aria-label="Menu"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          open ? 'max-h-96 border-t border-black/5' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col gap-1 bg-white px-5 pb-5 pt-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-bitcoin/10 text-bitcoin-dark' : 'text-gray-600 hover:bg-black/5 hover:text-ink'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href={whatsappLink}
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-bitcoin px-5 py-2.5 text-sm font-semibold text-white"
          >
            <FaWhatsapp size={16} />
            Rejoindre la communauté
          </a>
        </div>
      </div>
    </header>
  )
}
