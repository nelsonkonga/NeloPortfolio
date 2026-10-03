import React, { createContext, useContext, useState } from 'react'

export type Lang = 'fr' | 'en'

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const translations: Record<string, Record<Lang, string>> = {
  'nav.offer': { fr: 'Offre', en: 'Offer' },
  'nav.examples': { fr: 'Parcours', en: 'Journeys' },
  'nav.method': { fr: 'Déroulement', en: 'Process' },
  'nav.pricing': { fr: 'Tarifs', en: 'Pricing' },
  'nav.faq': { fr: 'Questions', en: 'FAQ' },
  'nav.about': { fr: 'À propos', en: 'About' },
  'nav.contact': { fr: 'Contact', en: 'Contact' },
  'nav.cta': { fr: 'Réserver un appel', en: 'Book a call' },

  'cta.book': { fr: 'Réserver un appel de 20 min', en: 'Book a 20-min call' },
  'cta.pricing': { fr: 'Voir les formules', en: 'See the packages' },
  'cta.instagram': { fr: 'Instagram', en: 'Instagram' },
  'cta.linkedin': { fr: 'LinkedIn', en: 'LinkedIn' },
  'cta.whatsapp': { fr: 'WhatsApp', en: 'WhatsApp' },

  'hero.badge': { fr: 'Hôtels indépendants', en: 'Independent hotels' },
  'hero.gallery': { fr: 'En images', en: 'In pictures' },
  'hero.seeAll': { fr: 'Voir tout', en: 'See all' },
  'photo.facade': { fr: 'Hôtel au bord de la piscine, le soir', en: 'Hotel by the pool at dusk' },
  'photo.chambre': { fr: 'Chambre d’hôtel', en: 'Hotel room' },
  'photo.suite': { fr: 'Lit d’une chambre d’hôtel', en: 'Hotel bed' },
  'photo.piscine': { fr: 'Piscine d’hôtel', en: 'Hotel pool' },
  'photo.accueil': { fr: 'Détail d’une chambre', en: 'Room detail' },
  'photo.terrasse': { fr: 'Terrasse d’hôtel', en: 'Hotel terrace' },
  'photo.sejour': { fr: 'Séjour dans une chambre', en: 'A stay in a room' },
  'photo.nuit': { fr: 'Chambre le soir', en: 'Room in the evening' },
  'hero.title': {
    fr: 'Des réservations directes pour votre hôtel, sans commission de plateforme.',
    en: 'Direct bookings for your hotel, without a platform commission.',
  },
  'hero.subtitle': {
    fr: 'Nous aidons les hôtels indépendants à recevoir des réservations sur leur propre site. Découverte en 14 jours, Essentiel en 21 jours, Complet en 30 jours, dès l’acompte et la réception de vos textes et photos.',
    en: 'We help independent hotels take bookings on their own website. Discovery in 14 days, Essential in 21 days, Complete in 30 days, once the deposit and your texts and photos are in.',
  },
  'hero.trust1': { fr: 'Un seul service', en: 'One service' },
  'hero.trust2': { fr: 'Délai écrit', en: 'A written deadline' },
  'hero.trust3': { fr: 'Deux séries de retouches', en: 'Two rounds of edits' },

  'problem.eyebrow': { fr: 'Le problème', en: 'The problem' },
  'problem.title': {
    fr: 'Chaque nuit réservée sur une plateforme vous laisse une commission.',
    en: 'Every night booked on a platform costs you a commission.',
  },
  'problem.lead': {
    fr: 'Le voyageur compare, réserve ailleurs, et vous payez pour une nuitée que vous auriez pu encaisser. Un site qui se contente de montrer des photos laisse ce réflexe en place.',
    en: 'The guest compares, books somewhere else, and you pay for a night you could have kept. A website that only shows photos leaves that habit in place.',
  },
  'problem.p1': {
    fr: 'La commission sort de la nuitée à chaque réservation intermédiée.',
    en: 'A commission leaves the room rate on every intermediated booking.',
  },
  'problem.p2': {
    fr: 'Vous ne récupérez ni le téléphone ni l’e-mail du client.',
    en: 'You never get the guest’s phone number or email.',
  },
  'problem.p3': {
    fr: 'Votre site, s’il existe, informe. Il ne prend pas la réservation.',
    en: 'If you already have a website, it informs. It does not take the booking.',
  },

  'compare.eyebrow': { fr: 'Avant / après', en: 'Before / after' },
  'compare.title': {
    fr: 'Le même hôtel, avec un endroit pour réserver.',
    en: 'The same hotel, with a place to book.',
  },
  'compare.before': { fr: 'Aujourd’hui', en: 'Today' },
  'compare.after': { fr: 'Avec le site', en: 'With the website' },
  'compare.b1': { fr: 'Le voyageur réserve sur une plateforme.', en: 'The guest books on a platform.' },
  'compare.a1': { fr: 'Il réserve sur votre site.', en: 'They book on your website.' },
  'compare.b2': { fr: 'Une commission sort de la nuitée.', en: 'A commission leaves the room rate.' },
  'compare.a2': { fr: 'Vous gardez le montant convenu avec le client.', en: 'You keep the amount agreed with the guest.' },
  'compare.b3': { fr: 'Vous n’avez pas le contact du client.', en: 'You do not have the guest’s contact.' },
  'compare.a3': { fr: 'Vous avez le nom et le téléphone.', en: 'You have the name and the phone number.' },
  'compare.b4': { fr: 'Le site montre l’hôtel sans prendre la demande.', en: 'The site shows the hotel and does not take the request.' },
  'compare.a4': { fr: 'Un bouton mène à la réservation ou à la demande.', en: 'A button leads to the booking or the request.' },

  'offer.eyebrow': { fr: 'L’offre', en: 'The offer' },
  'offer.title': { fr: 'Un site de réservation. Rien d’autre.', en: 'A booking website. That is the offer.' },
  'offer.lead': {
    fr: 'Pour les hôtels indépendants. Le résultat : des demandes de réservation en direct. Le moyen : un site clair, livré dans le délai de la formule.',
    en: 'For independent hotels. The result: direct booking requests. The means: a clear website, delivered on the package deadline.',
  },
  'offer.forWho': { fr: 'Pour qui', en: 'For whom' },
  'offer.forWho.value': { fr: 'Hôtels indépendants', en: 'Independent hotels' },
  'offer.result': { fr: 'Quel résultat', en: 'What result' },
  'offer.result.value': { fr: 'Des réservations prises chez vous', en: 'Bookings taken on your site' },
  'offer.how': { fr: 'Comment', en: 'How' },
  'offer.how.value': { fr: 'Un site livré en 14, 21 ou 30 jours', en: 'A website delivered in 14, 21 or 30 days' },
  'offer.b1.title': { fr: 'La réservation est sur votre site', en: 'The booking sits on your site' },
  'offer.b1.desc': {
    fr: 'Le visiteur comprend en quelques secondes qu’il peut réserver ici, pas seulement regarder des photos.',
    en: 'The visitor understands in seconds that they can book here, not only look at photos.',
  },
  'offer.b2.title': { fr: 'Le délai est écrit avant l’appel', en: 'The deadline is written before the call' },
  'offer.b2.desc': {
    fr: '14 jours, 21 jours ou 30 jours selon la formule, à partir de l’acompte et de vos textes et photos.',
    en: '14, 21 or 30 days depending on the package, starting from the deposit and your texts and photos.',
  },
  'offer.b3.title': { fr: 'Deux séries de modifications', en: 'Two rounds of edits' },
  'offer.b3.desc': {
    fr: 'Chaque formule les inclut. Vous voyez le site, vous demandez les ajustements, nous les faisons.',
    en: 'Every package includes them. You see the site, you ask for the adjustments, we make them.',
  },
  'offer.b4.title': { fr: 'Le prix est sur cette page', en: 'The price is on this page' },
  'offer.b4.desc': {
    fr: '450 €, 990 € ou 2 900 € jusqu’à 15 chambres. Vous n’attendez pas un devis pour savoir où vous mettez les pieds.',
    en: '€450, €990 or €2,900 for up to 15 rooms. You do not wait for a quote to know the range.',
  },

  'method.eyebrow': { fr: 'Déroulement', en: 'Process' },
  'method.title': { fr: 'Quatre étapes, un délai qui commence quand vous êtes prêt.', en: 'Four steps, and a deadline that starts when you are ready.' },
  'method.subtitle': {
    fr: 'Le délai de 14, 21 ou 30 jours court à partir de l’acompte et de la réception de vos textes et photos.',
    en: 'The 14, 21 or 30 day deadline starts once the deposit and your texts and photos have arrived.',
  },
  'method.s1.title': { fr: 'Appel de 20 minutes', en: '20-minute call' },
  'method.s1.desc': {
    fr: 'On vérifie le nombre de chambres, la formule, et ce que vous avez déjà comme photos et textes.',
    en: 'We check the room count, the package, and which photos and texts you already have.',
  },
  'method.s2.title': { fr: 'Acompte et contenus', en: 'Deposit and content' },
  'method.s2.desc': {
    fr: 'Vous envoyez les textes, les photos, et l’acompte. C’est ce jour-là que le délai démarre.',
    en: 'You send the texts, the photos, and the deposit. That is the day the deadline starts.',
  },
  'method.s3.title': { fr: 'Livraison dans le délai', en: 'Delivery within the deadline' },
  'method.s3.desc': {
    fr: '14 jours en Découverte, 21 jours en Essentiel, 30 jours en Complet.',
    en: '14 days for Discovery, 21 days for Essential, 30 days for Complete.',
  },
  'method.s4.title': { fr: 'Deux séries de retouches, puis mise en ligne', en: 'Two edit rounds, then go-live' },
  'method.s4.desc': {
    fr: 'Vous validez. Le solde est dû à la livraison. Le nom de domaine et l’hébergement de la première année sont dans la formule.',
    en: 'You approve. The balance is due on delivery. The domain name and first year of hosting are in the package.',
  },

  'scenarios.eyebrow': { fr: 'Parcours', en: 'Journeys' },
  'scenarios.title': { fr: 'Trois parcours pour voir à quoi sert chaque formule.', en: 'Three journeys so you can see what each package is for.' },
  'scenarios.s1.kicker': { fr: 'Formule Découverte', en: 'Discovery package' },
  'scenarios.s1.title': { fr: 'L’hôtel qui n’a pas encore de site', en: 'The hotel that does not have a website yet' },
  'scenarios.s1.body': {
    fr: 'L’établissement n’est visible que sur une plateforme. La formule Découverte pose une page, une galerie et un formulaire de contact. Délai : 14 jours une fois les photos et l’acompte reçus.',
    en: 'The property is only visible on a platform. Discovery sets up a page, a gallery and a contact form. Deadline: 14 days once the photos and the deposit are in.',
  },
  'scenarios.s2.kicker': { fr: 'Formule Essentiel', en: 'Essential package' },
  'scenarios.s2.title': { fr: 'L’hôtel qui veut la demande sur son site', en: 'The hotel that wants the request on its own site' },
  'scenarios.s2.body': {
    fr: 'Les nuits passent surtout par une plateforme. Le site actuel montre des photos et un numéro. La formule Essentiel ajoute un calendrier, un formulaire de réservation, le français et l’anglais. Délai : 21 jours.',
    en: 'Nights mostly go through a platform. The current site shows photos and a phone number. Essential adds a calendar, a booking form, French and English. Deadline: 21 days.',
  },
  'scenarios.s3.kicker': { fr: 'Formule Complet', en: 'Complete package' },
  'scenarios.s3.title': { fr: 'L’hôtel qui veut encaisser au moment de la demande', en: 'The hotel that wants payment when the request is made' },
  'scenarios.s3.body': {
    fr: 'Même point de départ, avec en plus le paiement de la nuitée sur le site et un espace pour suivre les demandes. Délai : 30 jours.',
    en: 'Same starting point, plus payment for the night on the site and a space to follow requests. Deadline: 30 days.',
  },

  'tarifs.eyebrow': { fr: 'Tarifs', en: 'Pricing' },
  'tarifs.title': { fr: 'Trois formules, jusqu’à 15 chambres.', en: 'Three packages, up to 15 rooms.' },
  'tarifs.subtitle': {
    fr: 'Les trois formules livrent un site d’hôtel, jusqu’à 15 chambres.',
    en: 'All three packages deliver a hotel website, for up to 15 rooms.',
  },
  'tarifs.back': { fr: 'Retour à l’accueil', en: 'Back to home' },
  'tarifs.rooms': { fr: 'Jusqu’à 15 chambres', en: 'Up to 15 rooms' },
  'tarifs.delay': { fr: 'Livré en {n} jours', en: 'Delivered in {n} days' },
  'tarifs.revisions': { fr: '2 séries de modifications incluses', en: '2 rounds of edits included' },
  'tarifs.includedTitle': { fr: 'Inclus', en: 'Included' },
  'tarifs.cta': { fr: 'Réserver un appel pour cette formule', en: 'Book a call for this package' },
  'tarifs.pkg.decouverte.name': { fr: 'Découverte', en: 'Discovery' },
  'tarifs.pkg.decouverte.tagline': {
    fr: 'Une page pour exister en dehors des plateformes et recevoir un premier contact direct.',
    en: 'A page so you exist outside the platforms and receive a first direct contact.',
  },
  'tarifs.pkg.decouverte.f1': {
    fr: 'Page d’accueil : hôtel, chambres, téléphone, bouton de contact',
    en: 'Homepage: hotel, rooms, phone, contact button',
  },
  'tarifs.pkg.decouverte.f2': {
    fr: 'Galerie photo',
    en: 'Photo gallery',
  },
  'tarifs.pkg.decouverte.f3': {
    fr: 'Formulaire de contact',
    en: 'Contact form',
  },
  'tarifs.pkg.decouverte.f4': {
    fr: 'Nom de domaine .com et hébergement, première année',
    en: '.com domain and hosting, first year',
  },
  'tarifs.pkg.essentiel.name': { fr: 'Essentiel', en: 'Essential' },
  'tarifs.pkg.essentiel.popularBadge': { fr: 'Le plus choisi', en: 'Most chosen' },
  'tarifs.pkg.essentiel.tagline': {
    fr: 'La formule pour recevoir la demande de réservation chez vous, en français et en anglais.',
    en: 'The package for taking the booking request on your site, in French and English.',
  },
  'tarifs.pkg.essentiel.includedHeader': {
    fr: 'Tout Découverte, plus :',
    en: 'Everything in Discovery, plus:',
  },
  'tarifs.pkg.essentiel.f1': {
    fr: 'Calendrier de disponibilité et formulaire de réservation',
    en: 'Availability calendar and booking form',
  },
  'tarifs.pkg.essentiel.f2': {
    fr: 'Site en français et en anglais',
    en: 'Website in French and English',
  },
  'tarifs.pkg.essentiel.f3': {
    fr: 'Page « L’établissement »',
    en: '“The property” page',
  },
  'tarifs.pkg.complet.name': { fr: 'Complet', en: 'Complete' },
  'tarifs.pkg.complet.tagline': {
    fr: 'La formule pour encaisser la nuitée sur le site et suivre les demandes.',
    en: 'The package for taking payment on the site and following requests.',
  },
  'tarifs.pkg.complet.includedHeader': {
    fr: 'Tout Essentiel, plus :',
    en: 'Everything in Essential, plus:',
  },
  'tarifs.pkg.complet.f1': {
    fr: 'Paiement de la nuitée sur le site (carte ou Mobile Money)',
    en: 'Payment for the night on the site (card or Mobile Money)',
  },
  'tarifs.pkg.complet.f2': {
    fr: 'Espace client : compte, connexion, historique',
    en: 'Guest area: account, login, history',
  },
  'tarifs.pkg.complet.f3': {
    fr: 'Écran simple pour suivre les demandes',
    en: 'A simple screen to follow requests',
  },

  'guarantee.title': { fr: 'Garantie de délai', en: 'Deadline guarantee' },
  'guarantee.text': {
    fr: 'Si le délai de votre formule est dépassé de notre fait, le mois d’hébergement suivant est offert. Deux séries de modifications sont incluses. Le délai part le jour où l’acompte et vos textes et photos sont reçus.',
    en: 'If your package deadline is missed because of us, the following month of hosting is free. Two rounds of edits are included. The deadline starts the day the deposit and your texts and photos are received.',
  },
  'tarifs.rule.title': { fr: 'Au-delà de 15 chambres', en: 'Beyond 15 rooms' },
  'tarifs.rule.text': {
    fr: 'Le prix affiché couvre jusqu’à 15 chambres. Chaque chambre au-dessus ajoute 15 €.',
    en: 'The listed price covers up to 15 rooms. Each room above that adds €15.',
  },
  'tarifs.domain.note': {
    fr: 'Le nom de domaine .com et l’hébergement de la première année sont dans chaque formule. Une extension locale (.cm) se chiffre à part, au tarif du registrar.',
    en: 'The .com domain and the first year of hosting are in every package. A local extension (.cm) is quoted separately, at the registrar’s price.',
  },
  'tarifs.resto.title': { fr: 'Vous tenez un restaurant ou une gelateria ?', en: 'You run a restaurant or a gelateria?' },
  'tarifs.resto.desc': {
    fr: 'Ce n’est pas la formule affichée ici. Écrivez-nous : carte en ligne, menu QR, réservation de tables ou click and collect se chiffrent à part.',
    en: 'That is not the package shown here. Write to us: online menu, QR menu, table booking or click and collect are quoted separately.',
  },
  'tarifs.resto.cta': { fr: 'Écrire pour un restaurant', en: 'Write about a restaurant' },

  'faq.eyebrow': { fr: 'Questions', en: 'Questions' },
  'faq.title': { fr: 'Avant l’appel.', en: 'Before the call.' },
  'faq.q1': { fr: 'Pour qui est cette offre ?', en: 'Who is this offer for?' },
  'faq.a1': {
    fr: 'Les hôtels indépendants. Le prix affiché va jusqu’à 15 chambres. Au-dessus, comptez 15 € par chambre supplémentaire.',
    en: 'Independent hotels. The listed price goes up to 15 rooms. Above that, add €15 per extra room.',
  },
  'faq.q2': { fr: 'Le délai part quand ?', en: 'When does the deadline start?' },
  'faq.a2': {
    fr: 'Le jour où nous avons l’acompte, les textes et les photos. Découverte : 14 jours. Essentiel : 21 jours. Complet : 30 jours.',
    en: 'The day we have the deposit, the texts and the photos. Discovery: 14 days. Essential: 21 days. Complete: 30 days.',
  },
  'faq.q3': { fr: 'Que dois-je envoyer ?', en: 'What do I need to send?' },
  'faq.a3': {
    fr: 'Les textes (présentation, chambres, tarifs), les photos, et les informations de contact. Sans photos, le délai ne démarre pas.',
    en: 'The texts (presentation, rooms, rates), the photos, and the contact details. Without photos, the deadline does not start.',
  },
  'faq.q4': { fr: 'Que se passe-t-il si le délai n’est pas tenu ?', en: 'What if the deadline is missed?' },
  'faq.a4': {
    fr: 'S’il est dépassé de notre fait, le mois d’hébergement suivant est offert. Un retard de votre côté sur les contenus décale le délai d’autant.',
    en: 'If we miss it, the following month of hosting is free. A delay on your side for the content moves the deadline by the same amount.',
  },
  'faq.q6': { fr: 'Comment se paie le site ?', en: 'How is the website paid for?' },
  'faq.a6': {
    fr: 'Un acompte au démarrage, le solde à la livraison. Le devis reste valable 30 jours.',
    en: 'A deposit at the start, the balance on delivery. The quote stays valid for 30 days.',
  },
  'faq.q7': { fr: 'Et un restaurant ?', en: 'What about a restaurant?' },
  'faq.a7': {
    fr: 'Ce n’est pas cette offre. On peut en parler sur WhatsApp, le prix sera un devis à part.',
    en: 'That is not this offer. We can talk about it on WhatsApp, and the price will be a separate quote.',
  },

  'about.eyebrow': { fr: 'À propos', en: 'About' },
  'about.title': { fr: 'Nelo', en: 'Nelo' },
  'about.role': { fr: 'Sites de réservation pour hôtels indépendants', en: 'Booking websites for independent hotels' },
  'about.location': { fr: 'Yaoundé, Cameroun. Hôtels en français et en anglais.', en: 'Yaoundé, Cameroon. Hotels in French and English.' },
  'about.bio': {
    fr: 'Je livre un site de réservation pour les hôtels indépendants. Vous m’envoyez vos textes et vos photos, je livre dans le délai de la formule : 14, 21 ou 30 jours. L’appel de 20 minutes sert à choisir la formule, pas à ajouter d’autres prestations.',
    en: 'I deliver a booking website for independent hotels. You send your texts and photos, I deliver on the package deadline: 14, 21 or 30 days. The 20-minute call is for choosing the package, not for adding other services.',
  },
  'about.h1': { fr: 'Une formule, un site', en: 'One package, one website' },
  'about.h2': { fr: 'Délai écrit', en: 'Written deadline' },
  'about.h3': { fr: 'Domaine et hébergement la 1re année', en: 'Domain and hosting in year 1' },
  'about.available': { fr: 'Appels ouverts', en: 'Calls open' },

  'contact.eyebrow': { fr: 'Appel', en: 'Call' },
  'contact.title': { fr: 'Vingt minutes pour choisir la formule.', en: 'Twenty minutes to choose the package.' },
  'contact.subtitle': {
    fr: 'Le bouton ouvre WhatsApp. Le formulaire sert si vous préférez qu’on vous rappelle.',
    en: 'The button opens WhatsApp. The form is there if you prefer a callback.',
  },
  'contact.company': { fr: 'Nom de l’hôtel', en: 'Hotel name' },
  'contact.company.placeholder': { fr: 'Nom de l’établissement', en: 'Property name' },
  'contact.name': { fr: 'Votre nom', en: 'Your name' },
  'contact.name.placeholder': { fr: 'Nom et prénom', en: 'Full name' },
  'contact.phone': { fr: 'WhatsApp', en: 'WhatsApp' },
  'contact.phone.placeholder': { fr: '+237 6 00 00 00 00', en: '+237 6 00 00 00 00' },
  'contact.need': { fr: 'Formule', en: 'Package' },
  'contact.need.placeholder': { fr: 'Choisir une formule', en: 'Choose a package' },
  'contact.need.decouverte': { fr: 'Découverte, 450 €, 14 jours', en: 'Discovery, €450, 14 days' },
  'contact.need.essentiel': { fr: 'Essentiel, 990 €, 21 jours', en: 'Essential, €990, 21 days' },
  'contact.need.complet': { fr: 'Complet, 2 900 €, 30 jours', en: 'Complete, €2,900, 30 days' },
  'contact.need.unsure': { fr: 'Je ne sais pas encore', en: 'I am not sure yet' },
  'contact.need.restaurant': { fr: 'Restaurant (devis à part)', en: 'Restaurant (separate quote)' },
  'contact.send': { fr: 'Demander l’appel', en: 'Request the call' },
  'contact.sending': { fr: 'Envoi…', en: 'Sending…' },
  'contact.success': { fr: 'La conversation WhatsApp est ouverte. Envoyez le message pour confirmer l’appel.', en: 'The WhatsApp chat is open. Send the message to confirm the call.' },
  'contact.error': { fr: 'L’envoi n’a pas abouti. Écrivez sur WhatsApp.', en: 'The form did not send. Write on WhatsApp.' },
  'contact.err.name': { fr: 'Indiquez votre nom.', en: 'Add your name.' },
  'contact.err.phone': { fr: 'Indiquez un numéro WhatsApp.', en: 'Add a WhatsApp number.' },
  'contact.err.place': { fr: 'Indiquez le nom de l’hôtel.', en: 'Add the hotel name.' },
  'contact.err.need': { fr: 'Choisissez une formule.', en: 'Choose a package.' },
  'contact.direct': { fr: 'Ou écrire tout de suite', en: 'Or write now' },

  'footer.desc': {
    fr: 'Sites de réservation directe pour hôtels indépendants. 14, 21 ou 30 jours selon la formule.',
    en: 'Direct-booking websites for independent hotels. 14, 21 or 30 days depending on the package.',
  },
  'footer.legal': { fr: 'Mentions légales', en: 'Legal notice' },
  'footer.privacy': { fr: 'Confidentialité', en: 'Privacy' },
  'footer.cgu': { fr: 'Conditions générales', en: 'Terms' },
  'footer.copyright': { fr: '© 2026 Nelo. Tous droits réservés.', en: '© 2026 Nelo. All rights reserved.' },
}

const LangContext = createContext<LangContextValue>({
  lang: 'fr',
  setLang: () => {},
  t: (k) => k,
})

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem('nelo-lang') as Lang) ?? 'fr'
  })

  function t(key: string): string {
    return translations[key]?.[lang] ?? key
  }

  function handleSetLang(l: Lang) {
    setLang(l)
    localStorage.setItem('nelo-lang', l)
  }

  return (
    <LangContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
