// This file loads editable content from the JSON files in this folder.
// The admin dashboard (see /admin) reads and writes those same JSON files
// and the image folders below — so changes made there show up here after
// a rebuild, with no database involved.
import eventsData from './events.json'
import partnersData from './partners.json'
import pagesData from './pages.json'
import contactData from './contact.json'

const eventImages = import.meta.glob('../assets/events/*', { eager: true, import: 'default' })
const partnerLogos = import.meta.glob('../assets/partners/*', { eager: true, import: 'default' })

function resolve(map, filename) {
  if (!filename) return null
  const entry = Object.entries(map).find(([path]) => path.endsWith('/' + filename))
  return entry ? entry[1] : null
}

export const events = eventsData.map((event) => ({
  ...event,
  link: event.link || null,
  image: resolve(eventImages, event.image),
}))

export const partners = partnersData.map((partner) => ({
  ...partner,
  logo: resolve(partnerLogos, partner.logo),
}))

export const pillars = pagesData.pillars
export const offerings = pagesData.offerings
export const values = pagesData.values
export const about = pagesData.about

export const whatsappLink = contactData.whatsappLink
export const xLink = contactData.xLink
export const contactEmail = contactData.contactEmail
export const contactEmails = contactData.contactEmails
export const location = contactData.location
export const phones = contactData.phones
