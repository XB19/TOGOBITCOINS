import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaBitcoin,
  FaWhatsapp,
  FaGraduationCap,
  FaShieldAlt,
  FaCalendarAlt,
  FaChartLine,
  FaWallet,
  FaUnlockAlt,
  FaQuoteLeft,
  FaArrowRight,
  FaMapMarkerAlt,
} from 'react-icons/fa'
import Reveal from '../components/Reveal'
import { events, pillars, offerings, whatsappLink } from '../data/content'
import communityPhones from '../assets/community-phones.jpg'
import communityGroup from '../assets/community-group.jpg'
import communitySpeaker from '../assets/community-speaker.jpg'
import formationSession from '../assets/formation-session.jpg'
import xBanner from '../assets/x-banner.jpg'
import derbyDigital from '../assets/derby-banner.jpg'
import flyerFormation from '../assets/flyer-formation.jpg'

const pillarIcons = [FaGraduationCap, FaShieldAlt, FaCalendarAlt, FaChartLine]
const offeringIcons = [FaWallet, FaChartLine, FaUnlockAlt]

const partners = ['Trezor Academy']

const gallery = [
  { src: communityGroup, alt: 'Membres de Togo Bitcoin Community en t-shirt de la communauté' },
  { src: formationSession, alt: 'Session de formation Bitcoin avec Trezor Academy' },
  { src: derbyDigital, alt: 'Togo Bitcoin Community au Derby Digital, Stade Omnisport de Lomé' },
  { src: flyerFormation, alt: 'Affiche de la formation gratuite Bitcoin — Vague 3' },
]

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="grid-glow relative overflow-hidden border-b border-line bg-ink px-5 pb-24 pt-20 sm:pt-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-bitcoin/30 bg-bitcoin/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-bitcoin"
            >
              <FaBitcoin /> Togo Bitcoin Community
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 font-display text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
            >
              Bitcoin is <span className="text-gradient">Money.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-lg text-base leading-relaxed text-gray-400 sm:text-lg"
            >
              Nous guidons les Togolais vers la découverte et l'utilisation sécurisée du Bitcoin — éducation,
              sécurité et opportunités pour bâtir ensemble l'indépendance financière.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <a
                href={whatsappLink} target="_blank" rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-bitcoin px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-bitcoin/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-bitcoin/40"
              >
                <FaWhatsapp size={18} />
                Rejoindre la communauté
              </a>
              <NavLink
                to="/a-propos"
                className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-bitcoin hover:text-bitcoin"
              >
                En savoir plus
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={13} />
              </NavLink>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-bitcoin/20 blur-3xl" />
            <div className="coin-float overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-bitcoin/20">
              <img
                src={communityPhones}
                alt="Membres de la communauté échangeant du Bitcoin via smartphone"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="btc-spin absolute -bottom-6 -left-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-bitcoin-light to-bitcoin-dark text-white shadow-xl shadow-bitcoin/40">
              <FaBitcoin size={34} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* X BANNER */}
      <section className="bg-ink">
        <Reveal>
          <img
            src={xBanner}
            alt="Togo Bitcoin Community — Bitcoin is money. Apprendre, partager et construire l'avenir du Bitcoin."
            className="max-h-80 w-full object-cover"
          />
        </Reveal>
      </section>

      {/* PILLARS */}
      <section className="bg-white px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              Pourquoi rejoindre <span className="text-bitcoin-dark">Togo Bitcoin Community</span> ?
            </h2>
            <p className="mt-4 text-gray-600">
              Une communauté pensée pour accompagner chaque Togolais, du débutant curieux à l'investisseur avisé.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, i) => {
              const Icon = pillarIcons[i]
              return (
                <Reveal key={pillar.title} delay={i * 0.08}>
                  <div className="group h-full rounded-2xl border border-gray-200 bg-gray-50 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-bitcoin/50 hover:bg-white hover:shadow-xl hover:shadow-bitcoin/10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bitcoin/10 text-bitcoin-dark transition-all duration-300 group-hover:scale-110 group-hover:bg-bitcoin group-hover:text-white">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-ink">{pillar.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{pillar.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="border-y border-line bg-ink-soft px-5 py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <FaQuoteLeft className="mx-auto mb-6 text-3xl text-bitcoin/40" />
          <p className="font-display text-2xl font-medium italic leading-relaxed text-white sm:text-3xl">
            « Bitcoin est la première monnaie véritablement décentralisée, qui donne le pouvoir aux individus
            plutôt qu'aux institutions. »
          </p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-bitcoin">— Andreas Antonopoulos</p>
        </Reveal>
      </section>

      {/* OFFERINGS */}
      <section className="bg-white px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">Ce que nous proposons</h2>
            <p className="mt-4 text-gray-600">Des repères concrets pour avancer avec confiance dans l'univers Bitcoin.</p>
          </Reveal>

          <div className="mt-14 grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <div className="overflow-hidden rounded-3xl shadow-xl shadow-black/5">
                <img
                  src={communitySpeaker}
                  alt="Formation Bitcoin animée par un membre de la communauté"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2">
              {offerings.map((item, i) => {
                const Icon = offeringIcons[i]
                return (
                  <Reveal key={item.title} delay={i * 0.1} className={i === 2 ? 'sm:col-span-2' : ''}>
                    <div className="group relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-bitcoin/50 hover:bg-white hover:shadow-xl hover:shadow-bitcoin/10">
                      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-bitcoin/5 transition-transform duration-500 group-hover:scale-150" />
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-bitcoin text-white">
                        <Icon size={20} />
                      </div>
                      <h3 className="relative mt-5 font-display text-lg font-semibold text-ink">{item.title}</h3>
                      <p className="relative mt-2 text-sm leading-relaxed text-gray-600">{item.description}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS PREVIEW */}
      <section className="border-y border-line bg-ink-soft px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Événements récents</h2>
              <p className="mt-3 text-gray-400">Meetups, formations et rencontres partout au Togo.</p>
            </div>
            <NavLink
              to="/evenements"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-bitcoin"
            >
              Voir tous les événements
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={13} />
            </NavLink>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {events.slice(0, 2).map((event, i) => (
              <Reveal key={event.title} delay={i * 0.1}>
                <div className="group h-full rounded-2xl border border-line bg-panel p-7 transition-all duration-300 hover:-translate-y-2 hover:border-bitcoin/50 hover:shadow-xl hover:shadow-bitcoin/10">
                  <span className="inline-flex items-center gap-2 rounded-full bg-bitcoin/10 px-3 py-1 text-xs font-semibold text-bitcoin">
                    <FaCalendarAlt size={11} />
                    {event.date}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-white transition-colors group-hover:text-bitcoin">
                    {event.title}
                  </h3>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                    <FaMapMarkerAlt size={11} /> {event.place}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400">{event.description}</p>
                  {event.link && (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-bitcoin"
                    >
                      S'inscrire
                      <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={12} />
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-white px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">Notre communauté en images</h2>
            <p className="mt-4 text-gray-600">Des moments vécus lors de nos meetups et formations à travers le Togo.</p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {gallery.map((img, i) => (
              <Reveal key={img.src} delay={i * 0.08}>
                <div className="group overflow-hidden rounded-2xl shadow-md shadow-black/5">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Ils nous accompagnent</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              {partners.map((partner) => (
                <span
                  key={partner}
                  className="inline-block rounded-full border border-gray-200 bg-gray-50 px-6 py-3 text-sm font-medium text-gray-600 transition-all duration-300 hover:-translate-y-1 hover:border-bitcoin/50 hover:text-ink"
                >
                  {partner}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-ink px-5 pb-24 pt-4">
        <Reveal className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-bitcoin-dark via-bitcoin to-bitcoin-light px-8 py-14 text-center shadow-2xl shadow-bitcoin/20">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-10 -right-10 h-52 w-52 rounded-full bg-black/10" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold text-ink sm:text-4xl">
                Notre mission : démocratiser et vulgariser l'utilisation du Bitcoin au Togo.
              </h2>
              <a
                href={whatsappLink} target="_blank" rel="noreferrer"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <FaWhatsapp size={18} />
                Rejoindre notre communauté WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
