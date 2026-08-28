import { FaBullseye, FaEye, FaHandshake, FaShieldAlt, FaWhatsapp } from 'react-icons/fa'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { values, whatsappLink } from '../data/content'
import communityGroup from '../assets/community-group.jpg'
import communityCake from '../assets/community-cake.jpg'

const valueIcons = [FaShieldAlt, FaHandshake]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="À propos de nous"
        title="Guider les Togolais vers le Bitcoin"
        subtitle="TBC est une communauté qui accompagne la découverte et l'utilisation sécurisée du Bitcoin, avec une formation gratuite pour les débutants."
      />

      {/* MISSION / JUSTIFICATION */}
      <section className="bg-white px-5 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="overflow-hidden rounded-3xl shadow-xl shadow-black/5">
              <img
                src={communityGroup}
                alt="Membres de Togo Bitcoin Community lors d'un événement"
                className="aspect-[4/5] w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </Reveal>

          <div className="grid gap-6">
            <Reveal>
              <div className="h-full rounded-2xl border border-gray-200 bg-gray-50 p-8 transition-all duration-300 hover:border-bitcoin/40 hover:shadow-lg hover:shadow-bitcoin/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bitcoin/10 text-bitcoin-dark">
                  <FaBullseye size={20} />
                </div>
                <h2 className="mt-6 font-display text-2xl font-bold text-ink">Notre conviction</h2>
                <p className="mt-4 leading-relaxed text-gray-600">
                  Nous croyons que l'argent est essentiel pour que chacun puisse réaliser son plein potentiel. Le
                  Bitcoin représente, selon nous, la seule monnaie libre et équitable au monde — et une adoption
                  africaine pourrait contribuer à réduire les inégalités monétaires globales.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-gray-200 bg-gray-50 p-8 transition-all duration-300 hover:border-bitcoin/40 hover:shadow-lg hover:shadow-bitcoin/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bitcoin/10 text-bitcoin-dark">
                  <FaEye size={20} />
                </div>
                <h2 className="mt-6 font-display text-2xl font-bold text-ink">Notre vision</h2>
                <p className="mt-4 leading-relaxed text-gray-600">
                  Vulgariser l'utilisation du Bitcoin dans tous les coins et recoins du Togo — en rendant
                  l'éducation accessible, la sécurité prioritaire, et l'accompagnement gratuit pour les débutants.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="border-y border-line bg-ink-soft px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Nos valeurs fondamentales</h2>
            <p className="mt-4 text-gray-400">Les principes qui guident chacune de nos actions.</p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {values.map((value, i) => {
              const Icon = valueIcons[i]
              return (
                <Reveal key={value.title} delay={i * 0.1}>
                  <div className="group h-full rounded-2xl border border-line bg-panel p-8 transition-all duration-300 hover:-translate-y-2 hover:border-bitcoin/50 hover:shadow-xl hover:shadow-bitcoin/10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bitcoin/10 text-bitcoin transition-all duration-300 group-hover:scale-110 group-hover:bg-bitcoin group-hover:text-white">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-white">{value.title}</h3>
                    <p className="mt-3 leading-relaxed text-gray-400">{value.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-white px-5 py-20 text-center">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
          <img src={communityCake} alt="" className="h-full w-full object-cover" />
        </div>
        <Reveal className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Prêt à démarrer votre parcours Bitcoin ?
          </h2>
          <p className="mt-4 text-gray-600">
            Bénéficiez d'une formation gratuite pour les débutants et rejoignez une communauté bienveillante.
          </p>
          <a
            href={whatsappLink}
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
