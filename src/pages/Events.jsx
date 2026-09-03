import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaMapMarkedAlt,
  FaStore,
  FaBitcoin,
  FaTimes,
  FaArrowRight,
  FaWhatsapp,
} from 'react-icons/fa'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { events, whatsappLink } from '../data/content'

const projects = [
  {
    icon: FaMapMarkedAlt,
    title: 'Vulgarisation dans les 5 régions du Togo',
    description: "Un plan d'action pour porter l'éducation Bitcoin au-delà de Lomé, jusque dans chaque région du pays.",
  },
  {
    icon: FaStore,
    title: 'Sensibilisation des commerçants',
    description: "Une campagne dédiée pour faire découvrir aux commerçants togolais les avantages du paiement en Bitcoin.",
  },
]

function EventVisual({ event, className = '' }) {
  if (event.image) {
    return <img src={event.image} alt={event.title} className={`h-full w-full object-cover ${className}`} />
  }
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-bitcoin-dark via-bitcoin to-bitcoin-light ${className}`}
    >
      <FaBitcoin className="text-white/90" size={48} />
    </div>
  )
}

function EventBadges({ event, dark = false }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
          dark ? 'bg-bitcoin/10 text-bitcoin' : 'bg-bitcoin/10 text-bitcoin-dark'
        }`}
      >
        <FaCalendarAlt size={11} />
        {event.date}
      </span>
      {event.time && (
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${
            dark ? 'border-line text-gray-400' : 'border-gray-200 text-gray-500'
          }`}
        >
          <FaClock size={11} />
          {event.time}
        </span>
      )}
    </div>
  )
}

export default function Events() {
  const [selected, setSelected] = useState(null)
  const [featured, ...rest] = events

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setSelected(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [selected])

  return (
    <>
      <PageHero
        eyebrow="Nos meetups"
        title="Rencontres & événements Bitcoin togolais"
        subtitle="Les rencontres Bitcoin sont des outils puissants pour l'éducation et l'adoption — l'occasion d'apprendre et de tisser un réseau."
      />

      {/* FEATURED EVENT */}
      <section className="bg-white px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-bitcoin-dark">
              Événement le plus récent
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-5 grid overflow-hidden rounded-3xl border border-gray-200 shadow-xl shadow-black/5 lg:grid-cols-2">
              <div className="aspect-[4/3] w-full lg:aspect-auto">
                <EventVisual event={featured} />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <EventBadges event={featured} />
                <h2 className="mt-5 font-display text-2xl font-bold text-ink sm:text-3xl">{featured.title}</h2>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                  <FaMapMarkerAlt size={12} /> {featured.place}
                </p>
                <p className="mt-4 leading-relaxed text-gray-600">{featured.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {featured.link && (
                    <a
                      href={featured.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-bitcoin px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-bitcoin/30"
                    >
                      S'inscrire sur Luma
                    </a>
                  )}
                  <button
                    onClick={() => setSelected(featured)}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:border-bitcoin hover:text-bitcoin-dark"
                  >
                    Voir les détails
                    <FaArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* GRID OF PAST EVENTS */}
          <Reveal delay={0.12} className="mt-16">
            <h2 className="font-display text-2xl font-bold text-ink">Tous les événements passés</h2>
            <p className="mt-2 text-gray-600">Cliquez sur un événement pour voir tous les détails.</p>
          </Reveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((event, i) => (
              <Reveal key={event.title} delay={i * 0.06}>
                <button
                  onClick={() => setSelected(event)}
                  className="group block h-full w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 text-left transition-all duration-300 hover:-translate-y-2 hover:border-bitcoin/50 hover:shadow-xl hover:shadow-bitcoin/10"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <EventVisual
                      event={event}
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5">
                    <EventBadges event={event} />
                    <h3 className="mt-3 font-display text-base font-semibold text-ink transition-colors group-hover:text-bitcoin-dark">
                      {event.title}
                    </h3>
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500">
                      <FaMapMarkerAlt size={11} /> {event.place}
                    </p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="border-t border-line bg-ink-soft px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Nos projets en cours</h2>
            <p className="mt-4 text-gray-400">L'ambition de porter le Bitcoin dans tout le Togo.</p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {projects.map((project, i) => {
              const Icon = project.icon
              return (
                <Reveal key={project.title} delay={i * 0.1}>
                  <div className="group h-full rounded-2xl border border-line bg-panel p-8 transition-all duration-300 hover:-translate-y-2 hover:border-bitcoin/50 hover:shadow-xl hover:shadow-bitcoin/10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bitcoin/10 text-bitcoin transition-all duration-300 group-hover:scale-110 group-hover:bg-bitcoin group-hover:text-white">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-white">{project.title}</h3>
                    <p className="mt-3 leading-relaxed text-gray-400">{project.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 text-center">
        <Reveal className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Ne manquez plus aucun événement
          </h2>
          <p className="mt-4 text-gray-600">
            Rejoignez la communauté WhatsApp pour être informé de chaque meetup, formation et rencontre.
          </p>
          <a
            href={whatsappLink} target="_blank" rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-bitcoin px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-bitcoin/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-bitcoin/40"
          >
            <FaWhatsapp size={18} />
            Rejoindre la communauté
          </a>
        </Reveal>
      </section>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Fermer"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-md transition-colors hover:bg-bitcoin hover:text-white"
              >
                <FaTimes size={16} />
              </button>

              <div className="aspect-[16/9] w-full">
                <EventVisual event={selected} />
              </div>

              <div className="p-8 sm:p-10">
                <EventBadges event={selected} />
                <h3 className="mt-5 font-display text-2xl font-bold text-ink">{selected.title}</h3>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                  <FaMapMarkerAlt size={12} /> {selected.place}
                </p>
                <span className="mt-4 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                  {selected.theme}
                </span>
                <p className="mt-4 leading-relaxed text-gray-600">{selected.description}</p>

                {selected.link && (
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-bitcoin px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-bitcoin/30"
                  >
                    S'inscrire sur Luma
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
