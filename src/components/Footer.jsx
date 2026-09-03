import { NavLink } from 'react-router-dom'
import { FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { whatsappLink, xLink, contactEmails, phones } from '../data/content'
import logo from '../assets/logo.png'

const socials = [
  { icon: FaWhatsapp, label: 'WhatsApp', href: whatsappLink },
  { icon: FaXTwitter, label: 'X (Twitter)', href: xLink },
]

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/evenements', label: 'Événements' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-soft">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.9fr_1.1fr]">
        <div>
          <div className="inline-flex rounded-xl bg-white px-3 py-2 shadow-sm">
            <img src={logo} alt="Togo Bitcoin Community" className="h-10 w-auto object-contain" />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
            Nous œuvrons à démocratiser et vulgariser l'utilisation du Bitcoin au Togo, dans tous les coins et
            recoins du pays. Bitcoin is Money.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-bitcoin hover:text-bitcoin hover:shadow-md hover:shadow-bitcoin/20"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Navigation</h4>
          <ul className="mt-4 space-y-2.5">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className="text-sm text-gray-400 transition-colors duration-200 hover:text-bitcoin"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Communauté</h4>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            Suivez-nous sur X pour les dernières actualités, ou rejoignez notre communauté WhatsApp.
          </p>
          <a
            href={whatsappLink} target="_blank" rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-bitcoin/10 px-4 py-2 text-sm font-semibold text-bitcoin transition-all duration-300 hover:bg-bitcoin hover:text-white"
          >
            <FaWhatsapp /> Nous rejoindre
          </a>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
          <ul className="mt-4 space-y-2.5">
            {contactEmails.map((email) => (
              <li key={email}>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-sm text-gray-400 transition-colors duration-200 hover:text-bitcoin"
                >
                  <FaEnvelope size={13} className="flex-none" />
                  <span className="break-all">{email}</span>
                </a>
              </li>
            ))}
            {phones.map((phone) => (
              <li key={phone}>
                <a
                  href={`tel:+228${phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-sm text-gray-400 transition-colors duration-200 hover:text-bitcoin"
                >
                  <FaPhone size={13} className="flex-none" />
                  {phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line px-5 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Togo Bitcoin Community — Tous droits réservés.
      </div>
    </footer>
  )
}
