import React, { createContext, useContext, useState } from 'react'

export type Lang = 'fr' | 'en'

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const translations: Record<string, Record<Lang, string>> = {
  // Nav
  'nav.expertise': { fr: 'Expertise', en: 'Expertise' },
  'nav.projects': { fr: 'Études de cas', en: 'Case Studies' },
  'nav.methodology': { fr: 'Méthodologie', en: 'Methodology' },
  'nav.pricing': { fr: 'Tarifs', en: 'Pricing' },
  'nav.portfolio': { fr: 'Portfolio', en: 'Portfolio' },
  'nav.about': { fr: 'À propos', en: 'About' },
  'nav.contact': { fr: 'Contact', en: 'Contact' },
  'nav.cta': { fr: 'Discuter de votre projet', en: 'Discuss your project' },

  // Hero
  'hero.badge': { fr: 'Disponible pour de nouveaux projets', en: 'Available for new projects' },
  'hero.title': { fr: 'Propulsez votre entreprise. Sécurisez vos données. Intégrez l\'IA.', en: 'Accelerate your business. Secure your data. Integrate AI.' },
  'hero.subtitle': { fr: 'Solutions digitales premium, architectures sécurisées et automatisation intelligente pour les PME, l\'hôtellerie et la restauration.', en: 'Premium digital solutions, secure architectures and intelligent automation for SMBs, hospitality and restaurants.' },
  'hero.cta.primary': { fr: 'Voir mon expertise', en: 'View my expertise' },
  'hero.cta.secondary': { fr: 'Demander un audit', en: 'Request an audit' },

  // Services
  'services.title': { fr: 'Mon Expertise', en: 'My Expertise' },
  'services.subtitle': { fr: 'Des solutions techniques de pointe adaptées à vos enjeux business.', en: 'State-of-the-art technical solutions adapted to your business challenges.' },
  'services.web.title': { fr: 'Création Web & Plateformes Premium', en: 'Web Development & Premium Platforms' },
  'services.web.desc': { fr: 'Réservation en ligne, menus digitaux, interfaces sur-mesure pour l\'hôtellerie et la restauration haut de gamme.', en: 'Online booking, digital menus, bespoke interfaces for luxury hospitality and restaurant industries.' },
  'services.ai.title': { fr: 'Automatisation & Workflows IA', en: 'AI Automation & Workflows' },
  'services.ai.desc': { fr: 'Intégration d\'outils IA, ingestion de données et pipelines automatisés pour maximiser votre productivité.', en: 'AI tools integration, data ingestion and automated pipelines to maximize your productivity.' },
  'services.security.title': { fr: 'Cybersécurité & Architectures Backend', en: 'Cybersecurity & Backend Architectures' },
  'services.security.desc': { fr: 'Protection des données sensibles, authentification robuste par JWT, architectures sécurisées by design (Spring Boot, PostgreSQL, Node.js).', en: 'Sensitive data protection, robust JWT authentication, security-by-design architectures (Spring Boot, PostgreSQL, Node.js).' },
  'services.audit.title': { fr: 'Audit Digital & Performance', en: 'Digital Audit & Performance' },
  'services.audit.desc': { fr: 'Optimisation SEO, analyse de vitesse de chargement et amélioration des taux de conversion UX.', en: 'SEO optimization, loading speed analysis and UX conversion rate improvement.' },
  'services.cta.title': { fr: 'Prêt à sécuriser et optimiser votre infrastructure ?', en: 'Ready to secure and optimize your infrastructure?' },
  'services.cta.button': { fr: 'Demander un audit', en: 'Request an audit' },

  // Projects (Home page preview)
  'projects.title': { fr: 'Études de Cas Réelles & B2B', en: 'Real-World & B2B Case Studies' },
  'projects.subtitle': { fr: 'Des interventions techniques de haut niveau, des architectures résilientes et des résultats mesurables en production.', en: 'High-level technical interventions, resilient architectures, and measurable production results.' },
  
  // Project 1: Sellam.store Monétisation
  'projects.p1.title': { fr: 'Sellam.store · Monétisation SaaS & Mobile Money', en: 'Sellam.store · SaaS Monetization & Mobile Money' },
  'projects.p1.desc': { fr: 'Conception d\'un module d\'abonnements à états, intégration CinetPay Mobile Money sécurisée avec webhooks anti-falsification et stratégie de repli manuel résiliente pour marché émergent.', en: 'State-machine subscription module, secure CinetPay Mobile Money integration with anti-tampering webhooks, and resilient manual fallback strategy for emerging markets.' },
  'projects.p1.metric': { fr: '100% Résilient', en: '100% Resilient' },
  'projects.p1.metricLabel': { fr: 'Repli Mobile Money garanti', en: 'Guaranteed Mobile Money fallback' },
  'projects.p1.result': { fr: 'Architecture abonnements & parrainage multi-boutiques en production', en: 'Subscription & multi-store referral architecture in production' },
  'projects.p1.tag1': { fr: 'Java 21 / Spring Boot 4', en: 'Java 21 / Spring Boot 4' },
  'projects.p1.tag2': { fr: 'CinetPay Mobile Money', en: 'CinetPay Mobile Money' },
  'projects.p1.tag3': { fr: 'PostgreSQL (Supabase)', en: 'PostgreSQL (Supabase)' },

  // Project 2: Sellam.store Diagnostic Production
  'projects.p2.title': { fr: 'Sellam.store · Diagnostic Production & Offline-First', en: 'Sellam.store · Production Troubleshooting & Offline-First' },
  'projects.p2.desc': { fr: 'Résolution méthodique d\'un incident critique bloquant les appels API (faux-positif CORS masquant une URL invalide au build), migration SQL en production et spécification offline-first sur Dexie.js.', en: 'Methodical resolution of a critical incident blocking API calls (CORS false-positive masking build URL error), production SQL migration, and offline-first Dexie.js specification.' },
  'projects.p2.metric': { fr: '0 Incident bloquant', en: '0 Blocking incident' },
  'projects.p2.metricLabel': { fr: 'Production stabilisée', en: 'Stabilized production' },
  'projects.p2.result': { fr: 'Rétablissement immédiat des appels API multi-boutiques', en: 'Immediate recovery of multi-store API calls' },
  'projects.p2.tag1': { fr: 'Spring Security 7', en: 'Spring Security 7' },
  'projects.p2.tag2': { fr: 'Railway / DevOps', en: 'Railway / DevOps' },
  'projects.p2.tag3': { fr: 'IndexedDB (Dexie.js)', en: 'IndexedDB (Dexie.js)' },

  // Project 3: Audit Hôtelier
  'projects.p3.title': { fr: 'Audit Digital & Optimisation Hôtelière', en: 'Digital Audit & Hotel Optimization' },
  'projects.p3.desc': { fr: 'Analyse complète des Core Web Vitals, du SEO sémantique et du tunnel de réservation directe pour réduire la dépendance aux plateformes intermédiaires (OTA).', en: 'Comprehensive analysis of Core Web Vitals, semantic SEO, and direct booking funnel to reduce dependency on OTA platforms.' },
  'projects.p3.metric': { fr: '30+ Points de contrôle', en: '30+ Checkpoints' },
  'projects.p3.metricLabel': { fr: 'Audit exhaustif', en: 'Comprehensive audit' },
  'projects.p3.result': { fr: 'Rapport technique et plan d\'action pour maximiser les réservations directes', en: 'Technical report and action plan to maximize direct bookings' },
  'projects.p3.tag1': { fr: 'Audit SEO & UX', en: 'SEO & UX Audit' },
  'projects.p3.tag2': { fr: 'Core Web Vitals', en: 'Core Web Vitals' },
  'projects.p3.tag3': { fr: 'Tunnel de réservation', en: 'Booking Funnel' },

  // Methodology
  'methodology.title': { fr: 'Ma Méthodologie', en: 'My Methodology' },
  'methodology.subtitle': { fr: 'Un processus rigoureux pour des livrables sans compromis.', en: 'A rigorous process for uncompromising deliverables.' },
  'methodology.step1.title': { fr: 'Audit & Cadrage Stratégique', en: 'Audit & Strategic Scoping' },
  'methodology.step1.desc': { fr: 'Analyse de votre contexte, de vos objectifs business et de vos contraintes techniques pour définir une feuille de route claire.', en: 'Analysis of your context, business objectives and technical constraints to define a clear roadmap.' },
  'methodology.step2.title': { fr: 'Architecture & Security by Design', en: 'Architecture & Security by Design' },
  'methodology.step2.desc': { fr: 'Conception d\'architectures robustes intégrant la sécurité dès la conception, pas en option.', en: 'Design of robust architectures integrating security from the ground up, not as an afterthought.' },
  'methodology.step3.title': { fr: 'Développement & Intégration IA', en: 'Development & AI Integration' },
  'methodology.step3.desc': { fr: 'Développement agile, intégration des outils IA pertinents et tests rigoureux à chaque étape.', en: 'Agile development, integration of relevant AI tools and rigorous testing at every step.' },
  'methodology.step4.title': { fr: 'Déploiement & Suivi', en: 'Deployment & Monitoring' },
  'methodology.step4.desc': { fr: 'Mise en production maîtrisée, monitoring continu et accompagnement post-livraison pour garantir la performance.', en: 'Controlled production deployment, continuous monitoring and post-delivery support to ensure performance.' },

  // About
  'about.title': { fr: 'À Propos', en: 'About' },
  'about.role': { fr: 'Consultant Web & IA', en: 'Web & AI Consultant' },
  'about.location': { fr: 'Yaoundé, Cameroun — Disponible à l\'international', en: 'Yaoundé, Cameroon — Available internationally' },
  'about.bio': { fr: 'Formé à l\'ingénierie logicielle et aux mathématiques appliquées, j\'accompagne les entreprises dans leur transformation digitale avec une rigueur scientifique. Mon approche repose sur la fiabilité : que ce soit pour concevoir l\'architecture backend sécurisée d\'un restaurant, réaliser l\'audit technique d\'un hôtel premium, ou automatiser des flux de travail complexes grâce à l\'IA, je construis des solutions durables. Mon exigence est simple : un code propre, des infrastructures solides et une technologie qui sert véritablement vos objectifs business.', en: 'Trained in software engineering and applied mathematics, I support businesses in their digital transformation with scientific rigor. My approach is built on reliability: whether designing the secure backend architecture of a restaurant, conducting a technical audit of a premium hotel, or automating complex workflows with AI, I build lasting solutions. My standard is simple: clean code, solid infrastructure and technology that truly serves your business objectives.' },
  'about.available': { fr: 'Disponible', en: 'Available' },
  'about.international': { fr: 'International', en: 'International' },
  'about.stat1.title': { fr: 'Code Clean', en: 'Clean Code' },
  'about.stat1.subtitle': { fr: 'Respect strict des standards de l\'industrie', en: 'Strict adherence to industry standards' },
  'about.stat2.title': { fr: 'Security by Design', en: 'Security by Design' },
  'about.stat2.subtitle': { fr: 'La protection de vos données intégrée dès la première ligne de code', en: 'Data protection built in from the first line of code' },
  'about.stat3.title': { fr: 'Veille Technologique', en: 'Tech Watch' },
  'about.stat3.subtitle': { fr: 'Utilisation des derniers standards en IA et développement Web', en: 'Using the latest standards in AI and Web development' },

  // Contact
  'contact.title': { fr: 'Discutons de votre projet', en: 'Let\'s discuss your project' },
  'contact.subtitle': { fr: 'Prenons le temps de comprendre vos besoins pour construire la meilleure solution.', en: 'Let\'s take the time to understand your needs to build the best solution.' },
  'contact.company': { fr: 'Nom de l\'entreprise', en: 'Company name' },
  'contact.company.placeholder': { fr: 'Nom de votre entreprise', en: 'Your company name' },
  'contact.name': { fr: 'Nom complet', en: 'Full name' },
  'contact.name.placeholder': { fr: 'Votre nom complet', en: 'Your full name' },
  'contact.phone': { fr: 'Numéro de téléphone (WhatsApp recommandé)', en: 'Phone number (WhatsApp recommended)' },
  'contact.phone.placeholder': { fr: '+237 6... ou +33 6...', en: '+237 6... or +1...' },
  'contact.email': { fr: 'Adresse email', en: 'Email address' },
  'contact.email.placeholder': { fr: 'contact@entreprise.com', en: 'contact@company.com' },
  'contact.need': { fr: 'Type de besoin', en: 'Type of need' },
  'contact.need.web': { fr: 'Création web', en: 'Web development' },
  'contact.need.ai': { fr: 'Intégration IA', en: 'AI integration' },
  'contact.need.security': { fr: 'Cybersécurité', en: 'Cybersecurity' },
  'contact.need.audit': { fr: 'Audit digital', en: 'Digital audit' },
  'contact.need.other': { fr: 'Autre', en: 'Other' },
  'contact.message': { fr: 'Décrivez votre projet', en: 'Describe your project' },
  'contact.message.placeholder': { fr: 'Décrivez votre projet, vos besoins, vos contraintes…', en: 'Describe your project, needs, timeline…' },
  'contact.send': { fr: 'Envoyer le message', en: 'Send message' },
  'contact.sending': { fr: 'Envoi en cours…', en: 'Sending…' },
  'contact.success': { fr: 'Message envoyé ! Je vous recontacte sous 24h.', en: 'Message sent! I\'ll get back to you within 24h.' },
  'contact.error': { fr: 'Une erreur est survenue. Veuillez réessayer.', en: 'An error occurred. Please try again.' },
  'contact.audit.title': { fr: 'Audit Technique Gratuit', en: 'Free Technical Audit' },
  'contact.audit.desc': { fr: '30 minutes pour analyser votre situation digitale et identifier les axes d\'amélioration prioritaires.', en: '30 minutes to analyze your digital situation and identify priority improvement areas.' },
  'contact.audit.direct': { fr: 'Prendre RDV directement', en: 'Book a direct call' },
  'contact.whatsapp.cta': { fr: 'Échanger sur WhatsApp', en: 'Chat on WhatsApp' },
  'contact.quote.title': { fr: 'Devis Sur-Mesure', en: 'Custom Quote' },
  'contact.quote.desc': { fr: 'Une proposition détaillée et transparente, adaptée à vos contraintes et à vos objectifs.', en: 'A detailed and transparent proposal, adapted to your constraints and objectives.' },
  'contact.strategy.title': { fr: 'Accompagnement Stratégique', en: 'Strategic Support' },
  // Methodology Teaser
  'methodology.teaser.title': {
    fr: 'Vous avez un projet digital pour votre établissement hôtelier ?',
    en: 'Have a digital project for your hotel establishment?',
  },
  'methodology.teaser.desc': {
    fr: 'Consultez nos forfaits transparents (Découverte, Essentiel, Complet) et leurs prestations détaillées.',
    en: 'Check our transparent packages (Discovery, Essential, Complete) and their detailed services.',
  },
  'methodology.teaser.btn': {
    fr: 'Consulter nos forfaits hôteliers',
    en: 'View our hotel packages',
  },

  // Tarifs / Pricing Page
  'tarifs.back': { fr: 'Retour à l\'accueil', en: 'Back to home' },
  'tarifs.badge': { fr: 'Tarifs Hôtellerie', en: 'Hotel Pricing' },
  'tarifs.title': { fr: 'Nos offres pour sites d\'hôtels', en: 'Our Hotel Website Packages' },
  'tarifs.subtitle': {
    fr: 'Ces formules clés en main sont spécialement conçues et dimensionnées pour les établissements hôteliers. Elles constituent un socle technique robuste, moderne et évolutif auquel des services ou fonctionnalités sur-mesure peuvent être ajoutés selon vos besoins spécifiques.',
    en: 'These turnkey packages are specifically designed and scaled for hotel properties. They provide a robust, modern, and scalable technical foundation to which custom features can be added according to your specific needs.',
  },
  'tarifs.priceLabel': { fr: 'Prix affiché', en: 'Starting price' },
  'tarifs.from': { fr: 'à partir de', en: 'from' },
  'tarifs.includedTitle': { fr: 'Services inclus :', en: 'Included services:' },
  'tarifs.cta': { fr: 'Demander ce package', en: 'Request this package' },
  'tarifs.ctaWhatsapp': { fr: 'Ou réserver via WhatsApp', en: 'Or book via WhatsApp' },

  // Package Découverte
  'tarifs.pkg.decouverte.name': { fr: 'Découverte', en: 'Discovery' },
  'tarifs.pkg.decouverte.tagline': {
    fr: 'Une présence digitale élégante pour valoriser votre établissement et capter vos premiers clients en direct.',
    en: 'An elegant digital presence to showcase your property and capture your first direct clients.',
  },
  'tarifs.pkg.decouverte.f1': {
    fr: 'Page d\'accueil (hero, présentation générale, responsive)',
    en: 'Homepage (hero, general presentation, responsive)',
  },
  'tarifs.pkg.decouverte.f2': {
    fr: 'Galerie photo (grille responsive avec affichage en grand au clic)',
    en: 'Photo gallery (responsive grid with fullscreen modal on click)',
  },
  'tarifs.pkg.decouverte.f3': {
    fr: 'Formulaire de contact fonctionnel',
    en: 'Functional contact form',
  },
  'tarifs.pkg.decouverte.f4': {
    fr: 'Nom de domaine .com & hébergement cloud haute performance (1ère année)',
    en: '.com domain & high-performance cloud hosting included (1st year)',
  },
  'tarifs.domain.note': {
    fr: 'Nom de domaine international (.com) et hébergement cloud inclus la première année dans chaque formule. Extension locale (.cm / .com.cm) disponible sur devis registrar.',
    en: 'International .com domain and cloud hosting included for the first year in all packages. Local extension (.cm / .com.cm) available upon registrar quote.',
  },

  // Package Essentiel
  'tarifs.pkg.essentiel.name': { fr: 'Essentiel', en: 'Essential' },
  'tarifs.pkg.essentiel.popularBadge': { fr: 'Le plus populaire', en: 'Most Popular' },
  'tarifs.pkg.essentiel.tagline': {
    fr: 'La formule idéale pour s\'affranchir des commissions des plateformes et booster vos réservations directes.',
    en: 'The ideal formula to break free from OTA commissions and boost your direct bookings.',
  },
  'tarifs.pkg.essentiel.includedHeader': {
    fr: 'Tout le Package Découverte, plus :',
    en: 'Everything in Discovery Package, plus:',
  },
  'tarifs.pkg.essentiel.f1': {
    fr: 'Réservation directe (calendrier de disponibilité + formulaire)',
    en: 'Direct booking (availability calendar + booking form)',
  },
  'tarifs.pkg.essentiel.f2': {
    fr: 'Version bilingue (français / anglais)',
    en: 'Bilingual version (French / English)',
  },
  'tarifs.pkg.essentiel.f3': {
    fr: 'Section « Notre histoire » avec mise en page narrative',
    en: '“Our Story” section with narrative layout',
  },

  // Package Complet
  'tarifs.pkg.complet.name': { fr: 'Complet', en: 'Complete' },
  'tarifs.pkg.complet.tagline': {
    fr: 'Une infrastructure hôtelière complète et autonome avec paiement sécurisé et espace de gestion des clients.',
    en: 'A complete and autonomous hotel platform with secure payment and customer management.',
  },
  'tarifs.pkg.complet.includedHeader': {
    fr: 'Tout le Package Essentiel, plus :',
    en: 'Everything in Essential Package, plus:',
  },
  'tarifs.pkg.complet.f1': {
    fr: 'Paiement en ligne intégré (carte bancaire / Mobile Money)',
    en: 'Integrated online payment (credit card / Mobile Money)',
  },
  'tarifs.pkg.complet.f2': {
    fr: 'Espace client (création de compte, connexion, historique)',
    en: 'Customer portal (account creation, login, history)',
  },
  'tarifs.pkg.complet.f3': {
    fr: 'Tableau de bord d\'administration basique',
    en: 'Basic administration dashboard',
  },

  // Règle de dimensionnement
  'tarifs.rule.title': { fr: 'Règle de dimensionnement', en: 'Sizing Rule' },
  'tarifs.rule.text': {
    fr: 'Prix de base valable jusqu\'à 15 chambres. Au-delà, un supplément de 15 € par chambre supplémentaire s\'applique.',
    en: 'Base price valid for up to 15 rooms. Beyond this threshold, an additional €15 fee applies per extra room.',
  },
  'tarifs.rule.desc': {
    fr: 'Ce supplément forfaitaire couvre la configuration individualisée des catégories, des galeries photos dédiées, des inventaires et des plannings de disponibilité.',
    en: 'This flat fee covers individual setup for room categories, dedicated photo galleries, inventories, and availability schedules.',
  },

  // Restaurant & Gelateria Note
  'tarifs.resto.title': {
    fr: 'Vous gérez un restaurant ou une gelateria ?',
    en: 'Running a restaurant or a gelateria?',
  },
  'tarifs.resto.desc': {
    fr: 'Contactez-moi directement pour discuter d\'une offre adaptée à votre activité. Les besoins d\'un restaurant ou d\'un salon glacier (carte en ligne, menu QR code dynamique, réservation de tables, click & collect) font l\'objet d\'un dimensionnement sur-mesure.',
    en: 'Contact me directly to discuss a tailor-made offer for your business. Restaurant and ice cream parlor requirements (online menu, dynamic QR code menu, table reservation, click & collect) are custom scoped.',
  },
  'tarifs.resto.cta': {
    fr: 'Discuter d\'une offre adaptée',
    en: 'Discuss a tailored offer',
  },
  'tarifs.resto.whatsapp': {
    fr: 'WhatsApp direct',
    en: 'Direct WhatsApp',
  },

  // Portfolio Page
  'portfolio.back': { fr: 'Retour à l\'accueil', en: 'Back to home' },
  'portfolio.badge': { fr: 'Portfolio Technique', en: 'Technical Portfolio' },
  'portfolio.title': { fr: 'Études de Cas & Réalisations en Production', en: 'Case Studies & Production Achievements' },
  'portfolio.subtitle': {
    fr: 'Des interventions réelles et documentées sur des architectures SaaS distribuées, des systèmes de paiement Mobile Money résilients et des audits de performance.',
    en: 'Documented, real-world interventions on distributed SaaS architectures, resilient Mobile Money payment systems, and performance audits.',
  },
  'portfolio.framing.title': { fr: 'Rigueur d\'Ingénierie & Résultats Vérifiés', en: 'Engineering Rigor & Verified Results' },
  'portfolio.framing.text': {
    fr: 'Chaque étude de cas reflète une mission technique concrète : les choix d\'architecture, la stack éprouvée, le diagnostic de bugs critiques en production et l\'impact mesurable sur le système.',
    en: 'Each case study reflects a concrete technical mission: architectural decisions, battle-tested stack, critical production debugging, and measurable system impact.',
  },
  'portfolio.tab.skills': { fr: 'Stack & Hard Skills', en: 'Stack & Hard Skills' },
  'portfolio.tab.approach': { fr: 'Démarche de l\'Ingénieur & Soft Skills', en: 'Engineering Approach & Soft Skills' },
  'portfolio.tab.impact': { fr: 'Réalisation Concrète & Impact', en: 'Concrete Achievement & Impact' },
  'portfolio.category.label': { fr: 'Catégorie :', en: 'Category:' },
  'portfolio.status.label': { fr: 'Statut :', en: 'Status:' },
  'portfolio.status.prod': { fr: 'En production', en: 'In Production' },
  'portfolio.cta': { fr: 'Un projet d\'envergure ? Parlons de votre architecture', en: 'An ambitious project? Let\'s discuss your architecture' },
  'portfolio.cta.viewAll': { fr: 'Découvrir tout le portfolio en détail', en: 'Explore full portfolio in detail' },

  // Project 1: Sellam.store Monetization
  'portfolio.p1.badge': { fr: 'sellam.store · Production', en: 'sellam.store · Production' },
  'portfolio.p1.category': { fr: 'Développement Web · Ingénierie & Sciences', en: 'Web Development · Engineering & Sciences' },
  'portfolio.p1.title': {
    fr: 'Conception et intégration d\'un module de monétisation SaaS (abonnements, paiement Mobile Money, parrainage) avec stratégie de repli résiliente',
    en: 'Design and integration of a SaaS monetization module (subscriptions, Mobile Money, referral) with resilient fallback strategy',
  },
  'portfolio.p1.summary': {
    fr: 'Pilotage de la conception et mise en production d\'un système complet de monétisation pour l\'application de gestion commerciale multi-boutiques sellam.store, avec machine à états et repli manuel en cas d\'indisponibilité du prestataire de paiement.',
    en: 'Product steering and production deployment of a complete monetization system for the multi-store commercial SaaS sellam.store, featuring a state machine and manual fallback for uninterrupted service.',
  },
  'portfolio.p1.skill.backend': {
    fr: 'Backend : Java 21, Spring Boot 4, Spring Security 6 (filtres personnalisés, @PreAuthorize, RBAC), Spring Data JPA / Hibernate, PostgreSQL (Supabase)',
    en: 'Backend: Java 21, Spring Boot 4, Spring Security 6 (custom filters, @PreAuthorize, RBAC), Spring Data JPA / Hibernate, PostgreSQL (Supabase)',
  },
  'portfolio.p1.skill.frontend': {
    fr: 'Frontend : React (hooks, state management), Axios, Tailwind CSS',
    en: 'Frontend: React (hooks, state management), Axios, Tailwind CSS',
  },
  'portfolio.p1.skill.api': {
    fr: 'Fintech & Webhooks : CinetPay (Mobile Money mode Seamless/Checkout), webhooks serveur-à-serveur avec revérification obligatoire anti-falsification',
    en: 'Fintech & Webhooks: CinetPay (Seamless/Checkout Mobile Money), server-to-server webhooks with mandatory server re-verification (anti-tampering)',
  },
  'portfolio.p1.skill.arch': {
    fr: 'Architecture : Machine à états (essai → actif → retard → expiré), filtre applicatif pour blocage conditionnel, gestion d\'erreurs métier vs indisponibilité de service tiers',
    en: 'Architecture: State machine for subscription lifecycle (trial → active → overdue → expired), security filter for conditional access, domain vs 3rd-party error isolation',
  },
  'portfolio.p1.skill.devops': {
    fr: 'DevOps & Légal : Déploiement Railway (backend) et Vercel (frontend), gestion sécurisée des variables d\'environnement (VITE_), rédaction CGU & Confidentialité conformes',
    en: 'DevOps & Compliance: Railway deployment (backend) and Vercel (frontend), secure environment variable management (VITE_), compliant Terms & Privacy policy drafting',
  },
  'portfolio.p1.approach.1': {
    fr: 'Pilotage produit rigoureux : formulation de décisions tranchées sur le modèle d\'abonnement (par boutique vs par compte), logique de parrainage conditionnelle et anticipation des cas limites multi-boutiques.',
    en: 'Rigorous product steering: firm decisions on subscription models (per store vs per account), conditional referral rewards, and multi-store edge case anticipation.',
  },
  'portfolio.p1.approach.2': {
    fr: 'Anticipation des contraintes terrain : conception proactive d\'un mécanisme de repli (paiement manuel Mobile Money) garantissant 100% de continuité de service face aux délais d\'activation administrative locale.',
    en: 'Field constraint anticipation: proactive design of a manual Mobile Money fallback mechanism ensuring 100% business continuity despite local administrative payment delays.',
  },
  'portfolio.p1.approach.3': {
    fr: 'Diagnostic méthodique : analyse de stack traces et logs de production pour isoler la cause racine (distinction entre redémarrage local devtools et crash-loop réel sur Railway).',
    en: 'Methodical troubleshooting: stack trace and production log analysis to isolate root cause (distinguishing local devtools reload from actual Railway crash-loop).',
  },
  'portfolio.p1.approach.4': {
    fr: 'Exigence de non-régression : vérification systématique de l\'état réel du code existant avant toute modification pour garantir la cohérence des patches avec l\'architecture en place.',
    en: 'Non-regression requirement: systematic verification of existing codebase state before any modification to ensure architectural consistency.',
  },
  'portfolio.p1.impact.1': {
    fr: 'Architecture de monétisation SaaS complète déployée et opérationnelle en production.',
    en: 'Complete SaaS monetization architecture deployed and operational in production.',
  },
  'portfolio.p1.impact.2': {
    fr: 'Continuité de service et encaissements garantis même en cas d\'indisponibilité du prestataire principal grâce au mode de repli manuel.',
    en: 'Uninterrupted service and payments guaranteed even during 3rd-party gateway downtime via manual fallback.',
  },
  'portfolio.p1.impact.3': {
    fr: 'Programme de parrainage robuste avec choix explicite du bénéficiaire sur les comptes multi-boutiques, sans ambiguïté produit.',
    en: 'Robust referral program with explicit beneficiary selection for multi-store accounts, eliminating product ambiguity.',
  },
  'portfolio.p1.impact.4': {
    fr: 'Résolution des crash-loops de déploiement et des avertissements React par vérification méthodique.',
    en: 'Deployment crash-loops and React warnings diagnosed and fixed through methodical verification.',
  },

  // Project 2: Sellam.store Troubleshooting
  'portfolio.p2.badge': { fr: 'sellam.store · Résolution Critique', en: 'sellam.store · Critical Fix' },
  'portfolio.p2.category': { fr: 'Développement Web · Ingénierie & Sciences', en: 'Web Development · Engineering & Sciences' },
  'portfolio.p2.title': {
    fr: 'Diagnostic et résolution d\'incidents de production sur une architecture SaaS distribuée (Spring Boot / React / Multi-cloud)',
    en: 'Troubleshooting and root-cause resolution of production incidents on a distributed SaaS architecture (Spring Boot / React / Multi-cloud)',
  },
  'portfolio.p2.summary': {
    fr: 'Diagnostic approfondi d\'un blocage API généralisé en production (fausse alerte CORS), migration SQL à chaud d\'une contrainte d\'intégrité PostgreSQL et spécification technique d\'une architecture de facturation offline-first sur Dexie.js.',
    en: 'Deep-dive troubleshooting of a widespread production API outage (CORS false alert), hotfix SQL migration of a PostgreSQL constraint, and technical spec of an offline-first billing architecture on Dexie.js.',
  },
  'portfolio.p2.skill.backend': {
    fr: 'Backend : Java 21, Spring Boot 4, Spring Security 7 (chaîne de filtres, CORS, JWT, @PreAuthorize), Hibernate/JPA 7, PostgreSQL (contraintes CHECK, migrations SQL)',
    en: 'Backend: Java 21, Spring Boot 4, Spring Security 7 (filter chain, CORS, JWT, @PreAuthorize), Hibernate/JPA 7, PostgreSQL (CHECK constraints, SQL migrations)',
  },
  'portfolio.p2.skill.frontend': {
    fr: 'Frontend & Offline : React, Axios (intercepteurs requêtes/réponses, cache offline localStorage), Vite (variables d\'environnement)',
    en: 'Frontend & Offline: React, Axios (request/response interceptors, localStorage offline cache), Vite (build environment variables)',
  },
  'portfolio.p2.skill.infra': {
    fr: 'Infrastructure & DevOps : Railway, Vercel, Supabase, analyse des logs runtime Railway, DNS/domaines applicatifs',
    en: 'Infrastructure & DevOps: Railway, Vercel, Supabase, Railway runtime log analysis, application DNS/domains',
  },
  'portfolio.p2.skill.debug': {
    fr: 'Méthodologie Debug : Analyse de traces Spring Security complexes, analyse de fichiers HAR (HTTP Archive) pour tracer les requêtes bout-en-bout, distinction faux-positif CORS vs URL mal formée',
    en: 'Debugging Methodology: Complex Spring Security trace analysis, HAR (HTTP Archive) file inspection for end-to-end tracing, CORS false-positive vs malformed URL root cause distinction',
  },
  'portfolio.p2.skill.offline': {
    fr: 'Architecture Offline-first : IndexedDB (Dexie.js), queue de synchronisation (pendingActions), stratégie de résolution de conflits hors-ligne',
    en: 'Offline-First Architecture: IndexedDB (Dexie.js), synchronization queue (pendingActions), offline conflict resolution strategy',
  },
  'portfolio.p2.approach.1': {
    fr: 'Démarche de diagnostic structurée en éliminant méthodiquement les hypothèses par ordre de probabilité (config CORS → service down → erreur de routing URL), évitant tout patch superficiel.',
    en: 'Structured diagnostic workflow eliminating hypotheses by probability (CORS config → service down → URL routing error), avoiding superficial patches.',
  },
  'portfolio.p2.approach.2': {
    fr: 'Capacité à distinguer un signal trompeur (erreur CORS générique) de sa cause racine réelle (concaténation d\'URL invalide côté build frontend), démontrée par vérification croisée logs/HAR.',
    en: 'Ability to distinguish misleading signals (generic CORS error) from true root causes (invalid URL concatenation at frontend build), verified across logs and HAR traces.',
  },
  'portfolio.p2.approach.3': {
    fr: 'Structuration d\'une demande multi-facettes (facturation offline, gestion de quantités, tour guidé) en sous-problèmes clairement délimités avant tout développement.',
    en: 'Structuring a multi-faceted requirement (offline billing, quantity merging, guided tour) into well-bounded sub-problems prior to development.',
  },
  'portfolio.p2.impact.1': {
    fr: 'Incident bloquant résolu : rétablissement immédiat de l\'intégralité des appels API de l\'application SaaS multi-boutiques.',
    en: 'Blocking incident resolved: immediate restoration of all API calls across the multi-store SaaS application.',
  },
  'portfolio.p2.impact.2': {
    fr: 'Contrainte d\'intégrité PostgreSQL défaillante corrigée en production sans interruption, permettant l\'activation manuelle immédiate des abonnements.',
    en: 'Faulty PostgreSQL integrity constraint fixed in production without downtime, enabling immediate manual subscription activation.',
  },
  'portfolio.p2.impact.3': {
    fr: 'Spécification technique détaillée livrée pour la facturation offline-first avec fusion de quantités et affichage optimiste sur Dexie / IndexedDB.',
    en: 'Detailed technical specification delivered for offline-first billing with quantity merging and optimistic UI on Dexie / IndexedDB.',
  },

  // Project 3: Hotel Audit
  'portfolio.p3.badge': { fr: 'Hôtellerie · Optimisation', en: 'Hospitality · Optimization' },
  'portfolio.p3.category': { fr: 'Performance Web, UX & SEO', en: 'Web Performance, UX & SEO' },
  'portfolio.p3.title': {
    fr: 'Audit technique, optimisation des Core Web Vitals et refonte du tunnel de réservation directe',
    en: 'Technical audit, Core Web Vitals optimization, and direct booking funnel overhaul',
  },
  'portfolio.p3.summary': {
    fr: 'Audit digital exhaustif couvrant plus de 30 points de contrôle pour un établissement hôtelier de premier plan : temps de chargement, SEO structurel, accessibilité et ergonomie du tunnel de réservation mobile.',
    en: 'Exhaustive digital audit covering 30+ checkpoints for a premier hotel property: loading performance, structural SEO, accessibility, and mobile booking funnel UX.',
  },
  'portfolio.p3.skill.audit': {
    fr: 'Audit & Diagnostic : Core Web Vitals (LCP, FID/INP, CLS), Google PageSpeed Insights, analyse d\'arborescence et de maillage interne',
    en: 'Audit & Diagnostics: Core Web Vitals (LCP, FID/INP, CLS), Google PageSpeed Insights, site tree and internal linking analysis',
  },
  'portfolio.p3.skill.frontend': {
    fr: 'Frontend : React, Tailwind CSS, Responsive Design mobile-first, optimisation des assets et médias',
    en: 'Frontend: React, Tailwind CSS, Mobile-first responsive design, media and asset optimization',
  },
  'portfolio.p3.skill.seo': {
    fr: 'SEO & Données Structurées : Balisage sémantique Schema.org (Hotel, Room, AggregateRating), Open Graph, métadonnées dynamiques',
    en: 'SEO & Structured Data: Semantic Schema.org markup (Hotel, Room, AggregateRating), Open Graph, dynamic metadata',
  },
  'portfolio.p3.approach.1': {
    fr: 'Analyse méthodique de l\'entonnoir de conversion pour identifier les points de friction et les causes d\'abandon de panier sur mobile.',
    en: 'Methodical conversion funnel analysis identifying mobile drop-off points and checkout friction.',
  },
  'portfolio.p3.approach.2': {
    fr: 'Priorisation des actions techniques par matrice effort / impact business direct, focalisée sur la réduction des commissions intermédiaires.',
    en: 'Technical action prioritization via effort vs direct business impact matrix, focused on lowering OTA commissions.',
  },
  'portfolio.p3.impact.1': {
    fr: 'Plus de 30 points de contrôle audités et plan d\'action technique priorisé livré à la direction de l\'établissement.',
    en: '30+ checkpoints audited and prioritized technical action plan delivered to hotel management.',
  },
  'portfolio.p3.impact.2': {
    fr: 'Optimisations SEO structurelles identifiées pour un potentiel de +40% de trafic organique qualifié.',
    en: 'Structural SEO optimizations identified for +40% potential qualified organic traffic.',
  },
  'portfolio.p3.impact.3': {
    fr: 'Recommandations d\'architecture pour un parcours de réservation fluide réduisant la dépendance aux OTA.',
    en: 'Architectural roadmap for a streamlined booking journey reducing reliance on OTA platforms.',
  },

  // Footer
  'footer.desc': { fr: 'Solutions digitales premium, cybersécurité et intelligence artificielle pour les entreprises exigeantes.', en: 'Premium digital solutions, cybersecurity and artificial intelligence for demanding businesses.' },
  'footer.legal': { fr: 'Mentions légales', en: 'Legal notice' },
  'footer.privacy': { fr: 'Confidentialité', en: 'Privacy' },
  'footer.cgu': { fr: 'Conditions générales', en: 'Terms & Conditions' },
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
