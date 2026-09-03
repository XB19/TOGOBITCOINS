import { NavLink, Outlet } from 'react-router-dom'
import { FaCalendarAlt, FaHandshake, FaFileAlt, FaAddressCard, FaSignOutAlt, FaBitcoin, FaExternalLinkAlt } from 'react-icons/fa'
import { useAuth } from '../lib/AuthContext'

const nav = [
  { to: '/', label: 'Vue d’ensemble', icon: FaBitcoin, end: true },
  { to: '/evenements', label: 'Événements', icon: FaCalendarAlt },
  { to: '/partenaires', label: 'Partenaires', icon: FaHandshake },
  { to: '/pages', label: 'Textes du site', icon: FaFileAlt },
  { to: '/contact', label: 'Coordonnées', icon: FaAddressCard },
]

export default function Layout() {
  const { logout } = useAuth()

  return (
    <div className="flex min-h-screen bg-[#f7f7f8]">
      <aside className="flex w-64 flex-none flex-col border-r border-gray-200 bg-ink text-white">
        <div className="flex items-center gap-2.5 border-b border-white/10 px-6 py-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-bitcoin-light to-bitcoin-dark">
            <FaBitcoin size={18} />
          </span>
          <div>
            <p className="font-display text-sm font-bold leading-tight">Togo Bitcoin</p>
            <p className="text-[11px] uppercase tracking-widest text-bitcoin">Admin</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-5">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-bitcoin text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={15} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-1 border-t border-white/10 px-3 py-4">
          <a
            href="http://localhost:5174"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            <FaExternalLinkAlt size={13} />
            Voir le site
          </a>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            <FaSignOutAlt size={13} />
            Déconnexion
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}
