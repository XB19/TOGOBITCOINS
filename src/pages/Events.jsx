import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaMapMarkedAlt, FaStore, FaBitcoin } from 'react-icons/fa'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { events, whatsappLink } from '../data/content'
import { FaWhatsapp } from 'react-icons/fa'
import flyerFormation from '../assets/flyer-formation.jpg'

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

export default function Events() {
  return (
    <>
      <PageHero
        eyebrow="Nos meetups"
        title="Rencontres & événements Bitcoin togolais"
        subtitle="Les rencontres Bitcoin sont des outils puissants pour l'éducation et l'adoption — l'occasion d'apprendre et de tisser un réseau."
      />

      {/* TIMELINE */}
      <section className="bg-white px-5 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="sticky top-24 overflow-hidden rounded-3xl shadow-xl shadow-black/5">
              <img
                src={flyerFormation}
                alt="Affiche officielle de la formation gratuite Bitcoin — Vague 3, avec Trezor Academy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="relative space-y-8 border-l border-gray-200 pl-8 sm:pl-10">
            {events.map((event, i) => (
              <Reveal key={event.title} delay={i * 0.1}>
                <div className="group relative rounded-2xl border border-gray-200 bg-gray-50 p-7 transition-all duration-300 hover:-translate-x-1 hover:border-bitcoin/50 hover:bg-white hover:shadow-xl hover:shadow-bitcoin/10">
                  <span className="absolute -left-[42px] top-8 flex h-6 w-6 items-center justify-center rounded-full bg-bitcoin text-white shadow-md shadow-bitcoin/30 sm:-left-[50px]">
                    <FaBitcoin size={12} />
                  </span>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-bitcoin/10 px-3 py-1 text-xs font-semibold text-bitcoin-dark">
                      <FaCalendarAlt size={11} />
                      {event.date}
                    </span>
                    {event.time && (
                      <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-500">
                        <FaClock size={11} />
                        {event.time}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 font-display text-xl font-semibold text-ink transition-colors group-hover:text-bitcoin-dark">
                    {event.title}
                  </h3>
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500">
                    <FaMapMarkerAlt size={11} /> {event.place}
                  </p>
                  <p className="mt-3 leading-relaxed text-gray-600">{event.description}</p>
                  {event.link && (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-bitcoin/10 px-4 py-2 text-sm font-semibold text-bitcoin-dark transition-all duration-300 hover:bg-bitcoin hover:text-white"
                    >
                      S'inscrire sur Luma
                    </a>
                  )}
                </div>
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
    </>
  )
}
