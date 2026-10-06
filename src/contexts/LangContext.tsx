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
  'call.title': { fr: 'Réserver un appel de 20 minutes', en: 'Book a 20-minute call' },
  'call.lead': {
    fr: 'Cet appel sert à choisir la formule. Rien à payer sur cette page.',
    en: 'This call is for choosing the package. Nothing to pay on this page.',
  },
  'call.missing': {
    fr: 'Les créneaux ne sont pas encore ouverts. Écrivez à nelo.engineering@hotmail.com pour fixer l’appel.',
    en: 'The time slots are not open yet. Write to nelo.engineering@hotmail.com to set the call.',
  },
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
    fr: 'Des réservations directes pour votre hôtel, {em}sans commission{/em} de plateforme.',
    en: 'Direct bookings for your hotel, {em}without a platform commission{/em}.',
  },
  'hero.subtitle': {
    fr: 'Nous aidons les hôtels indépendants à recevoir des réservations sur leur propre site. Découverte en 14 jours, Essentiel en 21 jours, Complet en 30 jours. Vous envoyez les textes et les photos, ou nous venons les faire sur place.',
    en: 'We help independent hotels take bookings on their own website. Discovery in 14 days, Essential in 21 days, Complete in 30 days. You send the texts and photos, or we come on site to make them.',
  },
  'hero.trust1': { fr: 'Un seul service', en: 'One service' },
  'hero.trust2': { fr: 'Délai écrit', en: 'A written deadline' },
  'hero.trust3': { fr: 'Deux séries de retouches', en: 'Two rounds of edits' },
  'hero.visual.aria': {
    fr: 'Une réservation directe arrive sur le site de l’hôtel. La commission de plateforme ne suit pas.',
    en: 'A direct booking arrives on the hotel website. The platform commission does not follow.',
  },
  'hero.visual.room': { fr: 'Chambre double', en: 'Double room' },
  'hero.visual.nights': { fr: '2 nuits', en: '2 nights' },
  'hero.visual.arrival': { fr: 'Arrivée', en: 'Arrival' },
  'hero.visual.departure': { fr: 'Départ', en: 'Departure' },
  'hero.visual.arrivalDate': { fr: 'Ven. 12', en: 'Fri 12' },
  'hero.visual.departureDate': { fr: 'Dim. 14', en: 'Sun 14' },
  'hero.visual.book': { fr: 'Réserver', en: 'Book' },
  'hero.visual.direct': { fr: 'Réservation directe', en: 'Direct booking' },
  'hero.visual.site': { fr: 'Sur votre site', en: 'On your site' },
  'hero.visual.commission': { fr: 'Commission', en: 'Commission' },
  'hero.visual.kept': { fr: 'Sans commission', en: 'No commission' },

  'problem.eyebrow': { fr: 'Le problème', en: 'The problem' },
  'problem.title': {
    fr: 'Chaque nuit réservée sur une plateforme vous laisse {em}une commission{/em}.',
    en: 'Every night booked on a platform costs you {em}a commission{/em}.',
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
    fr: 'Le même hôtel, avec {em}un endroit pour réserver{/em}.',
    en: 'The same hotel, with {em}a place to book{/em}.',
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
    fr: '14, 21 ou 30 jours selon la formule. Le délai part à la réception de vos contenus, ou le lendemain de la venue sur place.',
    en: '14, 21 or 30 days depending on the package. The deadline starts when your content arrives, or the day after the on-site visit.',
  },
  'offer.b3.title': { fr: 'Deux séries de modifications', en: 'Two rounds of edits' },
  'offer.b3.desc': {
    fr: 'Chaque formule les inclut. Vous voyez le site, vous demandez les ajustements, nous les faisons.',
    en: 'Every package includes them. You see the site, you ask for the adjustments, we make them.',
  },
  'offer.b4.title': { fr: 'Le prix est sur cette page', en: 'The price is on this page' },
  'offer.b4.desc': {
    fr: '449 €, 990 € ou 2 990 € si vous envoyez les contenus. 649 €, 1 490 € ou 3 990 € si nous venons sur place. Jusqu’à 15 chambres.',
    en: '€449, €990 or €2,990 if you send the content. €649, €1,490 or €3,990 if we come on site. Up to 15 rooms.',
  },

  'method.eyebrow': { fr: 'Déroulement', en: 'Process' },
  'method.title': { fr: 'Quatre étapes, {em}un délai{/em} qui commence quand vous êtes prêt.', en: 'Four steps, and {em}a deadline{/em} that starts when you are ready.' },
  'method.subtitle': {
    fr: 'Deux façons de démarrer. Vous envoyez les textes et les photos, ou nous venons sur place les réaliser.',
    en: 'Two ways to start. You send the texts and photos, or we come on site to make them.',
  },
  'method.s1.title': { fr: 'Appel de 20 minutes', en: '20-minute call' },
  'method.s1.desc': {
    fr: 'On vérifie le nombre de chambres, la formule, et si vous envoyez les contenus ou si nous venons sur place.',
    en: 'We check the room count, the package, and whether you send the content or we come on site.',
  },
  'method.s2.title': { fr: 'Acompte, puis le délai', en: 'Deposit, then the deadline' },
  'method.s2.desc': {
    fr: 'Si vous envoyez les contenus, le délai part le jour où l’acompte, les textes et les photos sont reçus. Si nous venons sur place, il part le lendemain de la visite, une fois l’acompte payé.',
    en: 'If you send the content, the deadline starts the day the deposit, texts and photos arrive. If we come on site, it starts the day after the visit, once the deposit is paid.',
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
  'scenarios.title': { fr: 'Trois parcours pour voir à quoi sert {em}chaque formule{/em}.', en: 'Three journeys so you can see what {em}each package{/em} is for.' },
  'scenarios.s1.kicker': { fr: 'Formule Découverte', en: 'Discovery package' },
  'scenarios.s1.title': { fr: 'L’hôtel qui n’a pas encore de site', en: 'The hotel that does not have a website yet' },
  'scenarios.s1.body': {
    fr: 'L’établissement n’est visible que sur une plateforme. La formule Découverte pose une page, une galerie et un formulaire de contact. Délai : 14 jours.',
    en: 'The property is only visible on a platform. Discovery sets up a page, a gallery and a contact form. Deadline: 14 days.',
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
  'tarifs.title': { fr: 'Trois formules, {em}jusqu’à 15 chambres{/em}.', en: 'Three packages, {em}up to 15 rooms{/em}.' },
  'tarifs.subtitle': {
    fr: 'Les trois formules livrent un site d’hôtel, jusqu’à 15 chambres.',
    en: 'All three packages deliver a hotel website, for up to 15 rooms.',
  },
  'tarifs.back': { fr: 'Retour à l’accueil', en: 'Back to home' },
  'tarifs.rooms': { fr: 'Jusqu’à 15 chambres', en: 'Up to 15 rooms' },
  'tarifs.delay': { fr: 'Livré en {n} jours', en: 'Delivered in {n} days' },
  'tarifs.revisions': { fr: '2 séries de modifications incluses', en: '2 rounds of edits included' },
  'tarifs.includedTitle': { fr: 'Inclus', en: 'Included' },
  'tarifs.cta': { fr: 'Voir les options', en: 'View options' },
  'tarifs.mode.label': { fr: 'Qui prépare les textes et les photos', en: 'Who prepares the texts and photos' },
  'tarifs.mode.supplied': { fr: 'Vous envoyez les contenus', en: 'You send the content' },
  'tarifs.mode.visit': { fr: 'Nous venons sur place', en: 'We come on site' },
  'tarifs.visit.note': {
    fr: 'Les textes et les photos publiés décrivent ce que nous avons vu sur place.',
    en: 'The published texts and photos describe what we saw on site.',
  },
  'tarifs.visit.yaounde': {
    fr: 'À Yaoundé, la venue est dans le prix affiché.',
    en: 'In Yaoundé, the visit is included in the listed price.',
  },
  'tarifs.visit.outside': {
    fr: 'Hors Yaoundé, le déplacement se chiffre à part, avant l’acompte.',
    en: 'Outside Yaoundé, travel is quoted separately, before the deposit.',
  },
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
  'guarantee.supplied': {
    fr: 'Si le délai de votre formule est dépassé de notre fait, le mois d’hébergement suivant est offert. Deux séries de modifications sont incluses. Le délai part le jour où l’acompte, les textes et les photos sont reçus.',
    en: 'If your package deadline is missed because of us, the following month of hosting is free. Two rounds of edits are included. The deadline starts the day the deposit, the texts and the photos are received.',
  },
  'guarantee.visit': {
    fr: 'Si le délai de votre formule est dépassé de notre fait, le mois d’hébergement suivant est offert. Deux séries de modifications sont incluses. Le délai part le lendemain de la visite sur place, une fois l’acompte payé. Si l’hôtel reporte la visite, le délai se décale d’autant.',
    en: 'If your package deadline is missed because of us, the following month of hosting is free. Two rounds of edits are included. The deadline starts the day after the on-site visit, once the deposit is paid. If the hotel postpones the visit, the deadline moves by the same amount.',
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
    fr: 'Ce n’est pas la formule affichée ici. Le même parcours ouvre un devis à part : carte en ligne, menu QR, réservation de tables ou click and collect.',
    en: 'That is not the package shown here. The same path opens a separate quote: online menu, QR menu, table booking or click and collect.',
  },
  'tarifs.resto.cta': { fr: 'Voir les options', en: 'View options' },

  'faq.eyebrow': { fr: 'Questions', en: 'Questions' },
  'faq.title': { fr: 'Avant {em}l’appel{/em}.', en: 'Before {em}the call{/em}.' },
  'faq.q1': { fr: 'Pour qui est cette offre ?', en: 'Who is this offer for?' },
  'faq.a1': {
    fr: 'Les hôtels indépendants. Le prix affiché va jusqu’à 15 chambres. Au-dessus, comptez 15 € par chambre supplémentaire.',
    en: 'Independent hotels. The listed price goes up to 15 rooms. Above that, add €15 per extra room.',
  },
  'faq.q2': { fr: 'Le délai part quand ?', en: 'When does the deadline start?' },
  'faq.a2': {
    fr: 'Si vous envoyez les contenus, le jour où l’acompte, les textes et les photos sont reçus. Si nous venons sur place, le lendemain de la visite, une fois l’acompte payé. Découverte : 14 jours. Essentiel : 21 jours. Complet : 30 jours.',
    en: 'If you send the content, the day the deposit, texts and photos arrive. If we come on site, the day after the visit, once the deposit is paid. Discovery: 14 days. Essential: 21 days. Complete: 30 days.',
  },
  'faq.q3': { fr: 'Qui fournit les textes et les photos ?', en: 'Who provides the texts and the photos?' },
  'faq.a3': {
    fr: 'Vous, ou nous. Si vous les envoyez, le délai attend leur réception avec l’acompte. Si nous venons sur place, nous photographions et nous écrivons d’après ce que nous avons vu. Ce qui n’a pas été vu n’est pas publié. À Yaoundé, la venue est dans le prix. Hors Yaoundé, le déplacement se chiffre à part.',
    en: 'You, or us. If you send them, the deadline waits for them together with the deposit. If we come on site, we photograph and write from what we saw. What was not seen is not published. In Yaoundé, the visit is included in the price. Outside Yaoundé, travel is quoted separately.',
  },
  'faq.q4': { fr: 'Que se passe-t-il si le délai n’est pas tenu ?', en: 'What if the deadline is missed?' },
  'faq.a4': {
    fr: 'S’il est dépassé de notre fait, le mois d’hébergement suivant est offert. Un retard de votre côté sur les contenus, ou un report de la visite, décale le délai d’autant.',
    en: 'If we miss it, the following month of hosting is free. A delay on your side for the content, or a postponed visit, moves the deadline by the same amount.',
  },
  'faq.q6': { fr: 'Comment se paie le site ?', en: 'How is the website paid for?' },
  'faq.a6': {
    fr: 'Un acompte au démarrage, par MTN Mobile Money ou Orange Money. Un paiement est limité à 500 000 FCFA, donc le prix est découpé en parts de ce montant. Le solde se paie à la livraison. Le devis reste valable 30 jours.',
    en: 'A deposit at the start, by MTN Mobile Money or Orange Money. One payment is limited to 500,000 FCFA, so the price is split into parts of that amount. The balance is paid on delivery. The quote stays valid for 30 days.',
  },
  'faq.q7': { fr: 'Et un restaurant ?', en: 'What about a restaurant?' },
  'faq.a7': {
    fr: 'Ce n’est pas cette offre. Le même parcours ouvre un devis à part.',
    en: 'That is not this offer. The same path opens a separate quote.',
  },

  'about.eyebrow': { fr: 'À propos', en: 'About' },
  'about.title': { fr: 'Nextzephyr', en: 'Nextzephyr' },
  'about.role': { fr: 'Sites de réservation pour hôtels indépendants', en: 'Booking websites for independent hotels' },
  'about.location': { fr: 'Yaoundé, Cameroun. Hôtels en français et en anglais.', en: 'Yaoundé, Cameroon. Hotels in French and English.' },
  'about.bio': {
    fr: 'Je livre un site de réservation pour les hôtels indépendants, en 14, 21 ou 30 jours. Vous envoyez les textes et les photos, ou je viens sur place les faire. Ce qui est publié décrit ce qui a été vu ou reçu. L’appel de 20 minutes sert à choisir la formule.',
    en: 'I deliver a booking website for independent hotels, in 14, 21 or 30 days. You send the texts and photos, or I come on site to make them. What is published describes what was seen or received. The 20-minute call is for choosing the package.',
  },
  'about.h1': { fr: 'Une formule, un site', en: 'One package, one website' },
  'about.h2': { fr: 'Délai écrit', en: 'Written deadline' },
  'about.h3': { fr: 'Domaine et hébergement la 1re année', en: 'Domain and hosting in year 1' },
  'about.available': { fr: 'Appels ouverts', en: 'Calls open' },

  'options.step1': { fr: '1. Vos informations', en: '1. Your details' },
  'options.step2': { fr: '2. Options', en: '2. Options' },
  'options.step.info': { fr: 'Vos informations', en: 'Your details' },
  'options.step.options': { fr: 'Options', en: 'Options' },
  'options.step.pay': { fr: 'Paiement', en: 'Payment' },
  'options.step.brief': { fr: 'Brief', en: 'Brief' },
  'options.progress': { fr: 'Étapes', en: 'Steps' },
  'options.package': { fr: 'Votre formule', en: 'Your package' },
  'options.from': { fr: 'à partir de', en: 'from' },
  'options.change': { fr: 'Changer', en: 'Change' },
  'options.title': {
    fr: 'Vous êtes à une étape d’un site qui prend {em}les réservations{/em}.',
    en: 'You are one step away from a website that takes {em}the bookings{/em}.',
  },
  'options.title.resto': {
    fr: 'Vous êtes à une étape d’un devis pour {em}votre restaurant{/em}.',
    en: 'You are one step away from a quote for {em}your restaurant{/em}.',
  },
  'options.lead': {
    fr: 'Dites-nous où envoyer le détail. Rien à payer à cette étape.',
    en: 'Tell us where to send the details. Nothing to pay on this step.',
  },
  'options.hotel': { fr: 'Nom de l’hôtel', en: 'Hotel name' },
  'options.place': { fr: 'Nom de l’établissement', en: 'Place name' },
  'options.place.placeholder': { fr: 'Restaurant du Centre', en: 'Central Restaurant' },
  'options.optional': { fr: 'facultatif', en: 'optional' },
  'options.hotel.placeholder': { fr: 'Hôtel du Centre', en: 'Central Hotel' },
  'options.email': { fr: 'Email', en: 'Email' },
  'options.email.placeholder': { fr: 'vous@hotel.com', en: 'you@hotel.com' },
  'options.phone': { fr: 'Téléphone', en: 'Phone' },
  'options.phone.hint': { fr: 'pour vous joindre au sujet du projet', en: 'so we can reach you about the project' },
  'options.see': { fr: 'Voir mes options', en: 'See my options' },
  'options.legal.before': { fr: 'En continuant, vous acceptez les', en: 'By continuing, you agree to the' },
  'options.legal.terms': { fr: 'conditions générales', en: 'terms' },
  'options.legal.and': { fr: 'et la', en: 'and the' },
  'options.legal.privacy': { fr: 'politique de confidentialité', en: 'privacy policy' },
  'options.legal.nospam': { fr: 'Pas de spam.', en: 'No spam.' },
  'options.choice.title': { fr: 'Vos options', en: 'Your options' },
  'options.mode.supplied': { fr: 'Vous envoyez les contenus', en: 'You send the content' },
  'options.mode.supplied.desc': {
    fr: 'Le délai part le jour où l’acompte, les textes et les photos sont reçus.',
    en: 'The deadline starts the day the deposit, the texts and the photos are received.',
  },
  'options.mode.visit': { fr: 'Nous venons sur place', en: 'We come on site' },
  'options.mode.visit.desc': {
    fr: 'Le délai part le lendemain de la visite, une fois l’acompte payé.',
    en: 'The deadline starts the day after the visit, once the deposit is paid.',
  },
  'options.summary': { fr: 'Récapitulatif', en: 'Summary' },
  'options.total': { fr: 'Total', en: 'Total' },
  'options.confirm': { fr: 'Continuer vers le paiement', en: 'Continue to payment' },
  'options.choice.continue': { fr: 'Continuer vers le paiement', en: 'Continue to payment' },
  'options.success': { fr: 'C’est noté. Votre demande est enregistrée.', en: 'Noted. Your request is saved.' },
  'options.error': { fr: 'L’enregistrement n’a pas abouti.', en: 'The request was not saved.' },
  'options.err.email': { fr: 'Indiquez un email valide.', en: 'Add a valid email.' },
  'options.resto.name': { fr: 'Restaurant', en: 'Restaurant' },
  'options.resto.choice': { fr: 'Le restaurant se chiffre à part', en: 'The restaurant is quoted separately' },
  'options.resto.choice.desc': {
    fr: 'Carte en ligne, menu QR, réservation de tables ou click and collect. Le montant se confirme avant tout paiement.',
    en: 'Online menu, QR menu, table booking or click and collect. The amount is confirmed before any payment.',
  },
  'options.pay.title': { fr: 'Paiement', en: 'Payment' },
  'options.pay.method': { fr: 'Moyen de paiement', en: 'Payment method' },
  'options.pay.mtn': { fr: 'MTN Mobile Money', en: 'MTN Mobile Money' },
  'options.pay.mtn.hint': { fr: 'Depuis un compte MTN au Cameroun', en: 'From an MTN account in Cameroon' },
  'options.pay.orange': { fr: 'Orange Money', en: 'Orange Money' },
  'options.pay.orange.hint': { fr: 'Depuis un compte Orange au Cameroun', en: 'From an Orange account in Cameroon' },
  'options.pay.secure': {
    fr: 'Le site ne prélève rien tout seul. Le transfert part de votre compte Mobile Money.',
    en: 'The site does not take money by itself. The transfer leaves your Mobile Money account.',
  },
  'options.pay.continue': { fr: 'Continuer vers le paiement', en: 'Continue to payment' },
  'options.pay.redirecting': { fr: 'Redirection…', en: 'Redirecting…' },
  'options.pay.due': { fr: 'À payer aujourd’hui', en: 'Due today' },
  'options.pay.deposit': { fr: 'Payer l’acompte', en: 'Pay the deposit' },
  'options.pay.balance': { fr: 'Solde à la livraison', en: 'Balance on delivery' },
  'options.pay.cap': {
    fr: 'Un paiement Mobile Money est limité à 500 000 FCFA. Le premier versement est l’acompte.',
    en: 'One Mobile Money payment is limited to 500,000 FCFA. The first payment is the deposit.',
  },
  'options.pay.quote': { fr: 'Devis à part', en: 'Separate quote' },
  'options.pay.error': {
    fr: 'La page de paiement sécurisée n’a pas pu s’ouvrir.',
    en: 'The secure payment page could not be opened.',
  },
  'options.pay.reason.formule': {
    fr: 'Cette formule n’a pas de montant en francs CFA.',
    en: 'This formula has no CFA franc amount.',
  },
  'options.pay.reason.url': {
    fr: 'L’adresse de retour du paiement n’est pas acceptée.',
    en: 'The payment return address was not accepted.',
  },
  'options.pay.reason.email': {
    fr: 'L’email n’est pas accepté pour le paiement.',
    en: 'The email was not accepted for payment.',
  },
  'options.pay.reason.method': {
    fr: 'Choisissez MTN Mobile Money ou Orange Money.',
    en: 'Choose MTN Mobile Money or Orange Money.',
  },
  'options.pay.uncharged': { fr: 'Vous n’avez pas été débité.', en: 'You have not been charged.' },
  'options.pay.send': { fr: 'Envoyez {amount} au {number}.', en: 'Send {amount} to {number}.' },
  'options.pay.motif': { fr: 'Motif', en: 'Reference' },
  'options.pay.seen': {
    fr: 'Le transfert est confirmé seulement quand il apparaît sur le compte.',
    en: 'The transfer is confirmed only when it shows on the account.',
  },
  'options.pay.reference': { fr: 'Référence du transfert', en: 'Transfer reference' },
  'options.pay.brief': { fr: 'Continuer vers le brief', en: 'Continue to the brief' },
  'options.brief.title': { fr: 'Le brief', en: 'The brief' },
  'options.brief.lead': {
    fr: 'Ces précisions préparent le travail. Rien n’est publié tant que ce n’est pas vu ou reçu.',
    en: 'These details prepare the work. Nothing is published until it has been seen or received.',
  },
  'options.brief.name': { fr: 'Votre nom', en: 'Your name' },
  'options.brief.city': { fr: 'Ville', en: 'City' },
  'options.brief.city.placeholder': { fr: 'Yaoundé', en: 'Yaoundé' },
  'options.brief.rooms': { fr: 'Nombre de chambres', en: 'Number of rooms' },
  'options.brief.notes': { fr: 'Précisions', en: 'Notes' },
  'options.brief.visit': {
    fr: 'Ces notes préparent la visite. Elles ne sont pas publiées telles quelles.',
    en: 'These notes prepare the visit. They are not published as written.',
  },
  'options.brief.supplied': {
    fr: 'Les textes et les photos se transmettent après cette étape.',
    en: 'The texts and photos are sent after this step.',
  },
  'options.brief.restaurant': {
    fr: 'Décrivez la carte, le menu QR, la réservation de tables ou le click and collect.',
    en: 'Describe the menu, the QR menu, table booking or click and collect.',
  },
  'options.brief.send': { fr: 'Envoyer le brief', en: 'Send the brief' },
  'options.brief.saved': { fr: 'C’est noté. Votre demande est enregistrée.', en: 'Noted. Your request is saved.' },
  'options.brief.local': {
    fr: 'Le brief est conservé sur cet appareil. L’enregistrement en base n’est pas encore branché. Vous n’avez pas été débité.',
    en: 'The brief stays on this device. The database is not connected yet. You have not been charged.',
  },
  'options.brief.paynote': {
    fr: 'Cette page ne confirme pas un paiement. Le transfert est confirmé seulement quand il est vu sur le compte.',
    en: 'This page does not confirm a payment. The transfer is confirmed only when it is seen on the account.',
  },
  'options.brief.err.name': { fr: 'Indiquez votre nom.', en: 'Add your name.' },

  'footer.desc': {
    fr: 'Sites de réservation directe pour hôtels indépendants. 14, 21 ou 30 jours selon la formule.',
    en: 'Direct-booking websites for independent hotels. 14, 21 or 30 days depending on the package.',
  },
  'footer.legal': { fr: 'Mentions légales', en: 'Legal notice' },
  'footer.privacy': { fr: 'Confidentialité', en: 'Privacy' },
  'footer.cgu': { fr: 'Conditions générales', en: 'Terms' },
  'footer.copyright': { fr: '© 2026 Nextzephyr. Tous droits réservés.', en: '© 2026 Nextzephyr. All rights reserved.' },
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
