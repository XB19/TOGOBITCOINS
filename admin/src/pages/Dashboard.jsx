import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaHandshake, FaFileAlt, FaAddressCard, FaArrowRight } from 'react-icons/fa'
import { api } from '../lib/api'
import { Card, PageHeader } from '../components/ui'

const cards = [
  { to: '/evenements', label: 'Événements', icon: FaCalendarAlt, key: 'events' },
  { to: '/partenaires', label: 'Partenaires', icon: FaHandshake, key: 'partners' },
  { to: '/pages', label: 'Textes du site', icon: FaFileAlt, key: 'pages' },
  { to: '/contact', label: 'Coordonnées', icon: FaAddressCard, key: 'contact' },
]

export default function Dashboard() {
  const [counts, setCounts] = useState({})

  useEffect(() => {
    Promise.all([api.get('/api/events'), api.get('/api/partners')]).then(([events, partners]) => {
      setCounts({ events: events.length, partners: partners.length })
    })
  }, [])

  return (
    <div>
      <PageHeader
        title="Vue d’ensemble"
        description="Gérez ici le contenu du site — chaque modification est enregistrée directement dans les fichiers du projet."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ to, label, icon: Icon, key }) => (
          <Link key={to} to={to}>
            <Card className="group h-full p-6 transition-all duration-200 hover:-translate-y-1 hover:border-bitcoin/40 hover:shadow-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-bitcoin/10 text-bitcoin-dark transition-all group-hover:bg-bitcoin group-hover:text-white">
                <Icon size={18} />
              </div>
              <p className="mt-4 font-display text-lg font-semibold text-ink">{label}</p>
              {counts[key] !== undefined && (
                <p className="text-sm text-gray-500">{counts[key]} élément(s)</p>
              )}
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-bitcoin-dark">
                Gérer <FaArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
