import imgFormation from '../assets/flyer-formation.jpg'
import imgDerby from '../assets/derby-banner.jpg'
import imgDev3 from '../assets/event-dev3.jpg'
import imgBmm from '../assets/event-bmm.jpg'
import imgDevAct2 from '../assets/event-devact2.jpg'
import imgAfricaBitcoinDay from '../assets/africa-bitcoin-day.jpg'
import imgDevMeetup from '../assets/dev-meetup.jpg'
import imgSatOnTheRoad from '../assets/sat-on-the-road.jpg'
import imgPizzaDay from '../assets/community-cake.jpg'

import logoAfricaBlockchain from '../assets/partners/africa-blockchain.png'
import logoAfricaBitcoinConference from '../assets/partners/africa-bitcoin-conference.png'
import logoFedi from '../assets/partners/fedi.png'
import logoKisaw from '../assets/partners/kisaw.png'

export const partners = [
  { name: 'Africa Blockchain Community', logo: logoAfricaBlockchain },
  { name: 'Africa Bitcoin Conference', logo: logoAfricaBitcoinConference },
  { name: 'Fedi', logo: logoFedi },
  { name: 'Kisaw', logo: logoKisaw },
]

export const events = [
  {
    title: 'Formation gratuite Bitcoin — Vague 3',
    date: '29 août, 5 & 12 sept. 2026',
    time: '08h–12h',
    place: 'Centre Togo Bitcoin Community, Villa KISAW, Hedzranawoe',
    theme: 'Formation & sensibilisation',
    description:
      "Trois matinées pour comprendre Bitcoin, pourquoi et comment l'utiliser, en partenariat avec Trezor Academy. La Session 1 a réuni les participants pour poser les bases et échanger — prochaine session le 5 septembre.",
    link: 'https://luma.com/1oabzb4k',
    image: imgFormation,
  },
  {
    title: 'Le Derby Digital',
    date: '22 août 2026',
    time: '14h00 GMT',
    place: 'Stade Omnisport de Lomé',
    theme: 'Sensibilisation & jeunesse',
    description:
      "Togo Bitcoin Community, partenaire officiel de l'édition 2026, est allée à la rencontre de la jeunesse togolaise pour déconstruire les idées reçues sur Bitcoin, avec un stand et un challenge « Mon ticket Derby Digital » (10 tickets à gagner).",
    image: imgDerby,
  },
  {
    title: 'Bitcoin Dev #4',
    date: '8 août 2026',
    time: '08h00 UTC',
    place: 'Centre Togo Bitcoin Community, Villa KISAW, Hedzranawoe',
    theme: 'Bitcoin pour les devs',
    description:
      "Après les bases de Linux, une session pratique pour découvrir comment Linux est utilisé pour contribuer à l'écosystème Bitcoin — ouverte aux débutants comme aux passionnés.",
    image: null,
  },
  {
    title: 'Bitcoin Dev #3',
    date: '11 juillet 2026',
    time: '08h00 UTC',
    place: 'Centre Togo Bitcoin Community, Villa KISAW, Hedzranawoe',
    theme: 'Bitcoin pour les devs',
    description:
      "Les participants ont découvert les bases de Linux et pourquoi il est un outil incontournable pour développer sur Bitcoin.",
    image: imgDev3,
  },
  {
    title: 'Bitcoin Mastermind 2026',
    date: '2 – 4 juillet 2026',
    time: null,
    place: 'Première conférence Bitcoin d’Afrique francophone',
    theme: 'Conférence régionale',
    description:
      "La délégation de Togo Bitcoin Community a pris part à cette conférence panafricaine : souveraineté monétaire, adoption réelle du Bitcoin au Togo, place des femmes dans Bitcoin, et opportunités de carrière liées à l'économie numérique.",
    image: imgBmm,
  },
  {
    title: 'Bitcoin Dev Act #2',
    date: '13 juin 2026',
    time: '08h00 UTC',
    place: 'Centre Togo Bitcoin Community, Villa KISAW, Hedzranawoe',
    theme: 'Bitcoin pour les devs',
    description:
      "« Devenir un pionnier du Bitcoin au Togo » — une session ouverte aux développeurs, étudiants et passionnés de technologie pour échanger, apprendre et construire sur Bitcoin.",
    image: imgDevAct2,
  },
  {
    title: 'Formation gratuite Bitcoin',
    date: 'Fin mai – 7 juin 2026',
    time: null,
    place: 'Centre Togo Bitcoin Community, Villa KISAW, Hedzranawoe',
    theme: 'Formation & sensibilisation',
    description:
      "Deux journées de formation en présentiel en partenariat avec Trezor Academy, jusqu'à une session finale sur « que doivent faire les Bitcoiners ? » — le début d'un nouveau chapitre pour les participants.",
    image: null,
  },
  {
    title: 'Africa Bitcoin Day — Bitcoin Festival',
    date: '24 mai 2026',
    time: null,
    place: 'Lomé',
    theme: 'Festival communautaire',
    description:
      "Le premier Bitcoin Festival togolais de la communauté : éducation, paiements en Bitcoin, activités et rencontres entre passionnés, curieux, jeunes et entrepreneurs — une journée mémorable pour le mouvement Bitcoin au Togo.",
    image: imgAfricaBitcoinDay,
  },
  {
    title: 'Premier Bitcoin Dev MeetUp',
    date: '10 mai 2026',
    time: null,
    place: 'Centre Togo Bitcoin Community, Villa KISAW, Hedzranawoe',
    theme: 'Bitcoin pour les devs',
    description:
      "Le tout premier Bitcoin Dev MeetUp de la communauté, réunissant développeurs, étudiants et passionnés de technologie autour d'un moment d'apprentissage et d'échanges sur Bitcoin.",
    image: imgDevMeetup,
  },
  {
    title: 'SAT ON THE ROAD',
    date: '14 avril 2026',
    time: null,
    place: 'Togo',
    theme: 'Caravane de sensibilisation',
    description:
      "Togo Bitcoin Community a accueilli SAT ON THE ROAD, une caravane dédiée à la sensibilisation au Bitcoin, pour une journée d'échanges, d'apprentissage et de partage.",
    image: imgSatOnTheRoad,
  },
  {
    title: 'Formation « Pourquoi le Bitcoin ? »',
    date: '14 juin 2025',
    time: null,
    place: 'En partenariat avec Trezor Academy',
    theme: 'Formation & sensibilisation',
    description:
      "Séance de formation avec les membres de la communauté, en partenariat avec Trezor Academy — un échange passionnant sur ce sujet fondamental.",
    image: null,
  },
  {
    title: 'Bitcoin Day',
    date: '31 mai 2025',
    time: '14h00 GMT',
    place: 'IPNET Togo',
    theme: 'Bitcoin pour les devs & informaticiens',
    description:
      "Une rencontre dédiée aux développeurs et informaticiens togolais pour explorer le fonctionnement technique du Bitcoin et ses opportunités.",
    image: null,
  },
  {
    title: 'Bitcoin Pizza Day',
    date: '22 mai 2025',
    time: null,
    place: 'Lomé',
    theme: 'Célébration historique',
    description:
      "Célébration d'un moment historique du Bitcoin, entre partage, pédagogie et bonne humeur au sein de la communauté.",
    image: imgPizzaDay,
  },
]

export const pillars = [
  {
    title: 'Éducation',
    description: 'Apprendre les fondamentaux du Bitcoin et de la blockchain, à votre rythme et en français.',
  },
  {
    title: 'Sécurité',
    description: 'Protéger ses fonds, reconnaître les arnaques et adopter les bonnes pratiques de cybersécurité.',
  },
  {
    title: 'Événements',
    description: 'Meetups, formations et webinaires pour échanger avec la communauté togolaise du Bitcoin.',
  },
  {
    title: 'Opportunités',
    description: "Explorer le potentiel d'investissement et de développement économique lié au Bitcoin.",
  },
]

export const offerings = [
  {
    title: 'Sécuriser et gérer ses Bitcoins',
    description: "Stockage des portefeuilles, bonnes pratiques et cybersécurité pour garder le contrôle total de ses fonds.",
  },
  {
    title: 'Investir intelligemment dans le Bitcoin',
    description: "Comprendre la volatilité, construire une stratégie et investir avec discipline sur le long terme.",
  },
  {
    title: 'Indépendance financière avec Bitcoin',
    description: "Utiliser l'éducation Bitcoin comme levier vers plus d'autonomie et de liberté financière.",
  },
]

export const values = [
  {
    title: 'Responsabilité',
    description: 'Fiabilité, livraison ponctuelle et communication transparente envers chaque membre de la communauté.',
  },
  {
    title: 'Solidarité',
    description: 'Bienveillance, humilité et traitement respectueux entre tous les membres, sans exception.',
  },
]

export const whatsappLink = 'https://chat.whatsapp.com/DGuyjFFrU1i5YUrWEBFpTY'
export const xLink = 'https://x.com/Togo_Bitcoin'
export const contactEmail = 'tgbitcoincom@gmail.com'
export const contactEmails = ['togobitcoincommunity@gmail.com', 'info@togobitcoin.org']
export const location = 'Centre Togo Bitcoin Community, Villa KISAW — Hedzranawoe, Lomé'
