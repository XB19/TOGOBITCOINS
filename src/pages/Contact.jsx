import { useState } from 'react'
import { FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaPaperPlane, FaCheckCircle } from 'react-icons/fa'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { whatsappLink } from '../data/content'
import communityCake from '../assets/community-cake.jpg'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons Bitcoin"
        subtitle="Une question, une envie de rejoindre la communauté ou de collaborer avec nous ? Écrivez-nous."
      />

      <section className="bg-white px-5 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="space-y-6">
              <div className="group rounded-2xl border border-gray-200 bg-gray-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-bitcoin/50 hover:bg-white hover:shadow-lg hover:shadow-bitcoin/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bitcoin/10 text-bitcoin-dark transition-all duration-300 group-hover:bg-bitcoin group-hover:text-white">
                  <FaWhatsapp size={20} />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">WhatsApp</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Le moyen le plus rapide de nous joindre et d'échanger avec toute la communauté en temps réel.
                </p>
                <a href={whatsappLink} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-bitcoin-dark">
                  Rejoindre le groupe <FaPaperPlane size={12} />
                </a>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-gray-200 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-bitcoin/50 hover:shadow-lg hover:shadow-bitcoin/10">
                <img
                  src={communityCake}
                  alt=""
                  className="absolute inset-0 h-full w-full scale-105 object-cover opacity-15 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bitcoin/10 text-bitcoin-dark transition-all duration-300 group-hover:bg-bitcoin group-hover:text-white">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">Basés au Togo</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    Actifs à Lomé et dans les régions, au plus près des membres de la communauté.
                  </p>
                </div>
              </div>

              <div className="group rounded-2xl border border-gray-200 bg-gray-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-bitcoin/50 hover:bg-white hover:shadow-lg hover:shadow-bitcoin/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bitcoin/10 text-bitcoin-dark transition-all duration-300 group-hover:bg-bitcoin group-hover:text-white">
                  <FaEnvelope size={20} />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">Écrivez-nous</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  Utilisez le formulaire ci-contre pour toute question ou proposition de partenariat.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 sm:p-10">
              {sent ? (
                <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                  <FaCheckCircle className="text-4xl text-bitcoin" />
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">Message envoyé !</h3>
                  <p className="mt-2 max-w-sm text-sm text-gray-600">
                    Merci {form.name || ''}, nous reviendrons vers vous très bientôt.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false)
                      setForm({ name: '', email: '', message: '' })
                    }}
                    className="mt-6 rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-bitcoin hover:text-bitcoin-dark"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Nom complet
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Votre nom"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-gray-400 focus:border-bitcoin"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="vous@exemple.com"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-gray-400 focus:border-bitcoin"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Votre message..."
                      className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-gray-400 focus:border-bitcoin"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-bitcoin px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-bitcoin/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-bitcoin/40 sm:w-auto"
                  >
                    Envoyer le message
                    <FaPaperPlane size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
