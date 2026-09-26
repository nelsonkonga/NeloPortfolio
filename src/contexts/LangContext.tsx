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

  // Projects
  'projects.title': { fr: 'Études de Cas B2B', en: 'B2B Case Studies' },
  'projects.subtitle': { fr: 'Des missions concrètes, des résultats mesurables.', en: 'Concrete missions, measurable results.' },
  'projects.p1.result': { fr: 'Rapport détaillé et plan d\'action technique livré', en: 'Detailed report and technical action plan delivered' },
  'projects.p1.metric': { fr: '30+ Points de contrôle', en: '30+ Checkpoints' },
  'projects.p1.metricLabel': { fr: 'Audit exhaustif', en: 'Comprehensive audit' },
  'projects.p2.result': { fr: 'API robuste, bases de données sécurisées et prêtes pour la production', en: 'Robust API, secured databases and production-ready' },
  'projects.p2.metric': { fr: 'Sécurité JWT Stricte', en: 'Strict JWT Security' },
  'projects.p2.metricLabel': { fr: 'Architecture Scalable', en: 'Scalable Architecture' },
  'projects.p3.result': { fr: 'Gain de temps maximal grâce à l\'ingestion automatique de données', en: 'Maximum time savings through automatic data ingestion' },
  'projects.p3.metric': { fr: '100% Automatisé', en: '100% Automated' },
  'projects.p3.metricLabel': { fr: '0 Intervention manuelle', en: '0 Manual intervention' },
  'projects.p1.title': { fr: 'Audit Digital & Optimisation Hôtelière', en: 'Digital Audit & Hotel Optimization' },
  'projects.p1.desc': { fr: 'Analyse complète des performances, du SEO et du parcours de réservation pour un établissement hôtelier de premier plan.', en: 'Complete performance, SEO and booking journey analysis for a leading hotel establishment.' },
  'projects.p1.tag1': { fr: 'Audit SEO', en: 'SEO Audit' },
  'projects.p1.tag2': { fr: 'UX Review', en: 'UX Review' },
  'projects.p1.tag3': { fr: 'Performance', en: 'Performance' },
  'projects.p2.title': { fr: 'Infrastructure Backend & Menu Numérique', en: 'Backend Infrastructure & Digital Menu' },
  'projects.p2.desc': { fr: 'Développement d\'une architecture sécurisée sous Spring Boot/PostgreSQL pour la gestion des commandes d\'un restaurant.', en: 'Development of a secure Spring Boot/PostgreSQL architecture for restaurant order management.' },
  'projects.p2.tag1': { fr: 'Spring Boot', en: 'Spring Boot' },
  'projects.p2.tag2': { fr: 'PostgreSQL', en: 'PostgreSQL' },
  'projects.p2.tag3': { fr: 'Sécurité JWT', en: 'JWT Security' },
  'projects.p3.title': { fr: 'Automatisation de Contenu IA', en: 'AI Content Automation' },
  'projects.p3.desc': { fr: 'Mise en place de pipelines automatisés reliant des flux de données à des CMS pour une publication optimisée.', en: 'Implementation of automated pipelines connecting data streams to CMSs for optimized publishing.' },
  'projects.p3.tag1': { fr: 'IA / LLM', en: 'AI / LLM' },
  'projects.p3.tag2': { fr: 'Automatisation', en: 'Automation' },
  'projects.p3.tag3': { fr: 'CMS', en: 'CMS' },

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
  'portfolio.badge': { fr: 'Portfolio', en: 'Portfolio' },
  'portfolio.title': { fr: 'Mes Réalisations', en: 'My Work' },
  'portfolio.subtitle': {
    fr: 'Découvrez en détail les projets que j\'ai conçus et livrés. Chaque réalisation illustre mon expertise technique, ma rigueur méthodologique et mon engagement envers des résultats concrets et mesurables.',
    en: 'Explore in detail the projects I\'ve designed and delivered. Each achievement showcases my technical expertise, methodical rigor and commitment to concrete, measurable results.',
  },
  'portfolio.context': { fr: 'Contexte', en: 'Context' },
  'portfolio.solution': { fr: 'Solution technique', en: 'Technical solution' },
  'portfolio.results': { fr: 'Résultats', en: 'Results' },
  'portfolio.stack': { fr: 'Stack technique', en: 'Tech stack' },
  'portfolio.cta': { fr: 'Un projet similaire ? Discutons-en', en: 'A similar project? Let\'s talk' },
  'portfolio.cta.viewAll': { fr: 'Découvrir tout le portfolio en détail', en: 'Explore full portfolio in detail' },

  // Portfolio Project 1
  'portfolio.p1.title': { fr: 'Audit Digital & Optimisation Hôtelière', en: 'Digital Audit & Hotel Optimization' },
  'portfolio.p1.context': {
    fr: 'Un établissement hôtelier de premier plan souhaitait améliorer sa visibilité en ligne, optimiser son parcours de réservation directe et réduire sa dépendance aux OTA (Booking, Expedia).',
    en: 'A leading hotel establishment wanted to improve its online visibility, optimize its direct booking journey and reduce dependency on OTAs (Booking, Expedia).',
  },
  'portfolio.p1.solution': {
    fr: 'Audit technique complet couvrant plus de 30 points de contrôle : performance de chargement (Core Web Vitals), audit SEO structurel et sémantique, analyse UX du tunnel de réservation, revue de l\'architecture mobile-first et recommandations d\'accessibilité.',
    en: 'Comprehensive technical audit covering 30+ checkpoints: loading performance (Core Web Vitals), structural and semantic SEO audit, booking funnel UX analysis, mobile-first architecture review and accessibility recommendations.',
  },
  'portfolio.p1.result1': { fr: '30+ points de contrôle audités', en: '30+ checkpoints audited' },
  'portfolio.p1.result2': { fr: 'Plan d\'action technique priorisé livré', en: 'Prioritized technical action plan delivered' },
  'portfolio.p1.result3': { fr: 'Optimisations SEO identifiées pour +40% de trafic organique potentiel', en: 'SEO optimizations identified for +40% potential organic traffic' },

  // Portfolio Project 2
  'portfolio.p2.title': { fr: 'Infrastructure Backend & Menu Numérique', en: 'Backend Infrastructure & Digital Menu' },
  'portfolio.p2.context': {
    fr: 'Un restaurant haut de gamme avait besoin d\'une infrastructure backend robuste et sécurisée pour gérer ses commandes en ligne, son menu dynamique et la communication avec sa clientèle.',
    en: 'A premium restaurant needed a robust and secure backend infrastructure to manage online orders, dynamic menu and customer communication.',
  },
  'portfolio.p2.solution': {
    fr: 'Développement d\'une API REST complète sous Spring Boot avec PostgreSQL. Authentification JWT stricte, gestion des rôles (admin, serveur, client), système de commandes en temps réel et panel d\'administration pour la mise à jour du menu et des prix.',
    en: 'Development of a complete REST API with Spring Boot and PostgreSQL. Strict JWT authentication, role management (admin, server, client), real-time order system and admin panel for menu and price updates.',
  },
  'portfolio.p2.result1': { fr: 'Architecture sécurisée JWT production-ready', en: 'Production-ready JWT secured architecture' },
  'portfolio.p2.result2': { fr: 'Base de données optimisée et scalable', en: 'Optimized and scalable database' },
  'portfolio.p2.result3': { fr: 'Temps de réponse API < 200ms', en: 'API response time < 200ms' },

  // Portfolio Project 3
  'portfolio.p3.title': { fr: 'Automatisation de Contenu IA', en: 'AI Content Automation' },
  'portfolio.p3.context': {
    fr: 'Une entreprise de médias souhaitait automatiser la collecte, le traitement et la publication de contenus éditoriaux à partir de multiples sources de données, sans intervention humaine récurrente.',
    en: 'A media company wanted to automate the collection, processing and publishing of editorial content from multiple data sources, without recurring human intervention.',
  },
  'portfolio.p3.solution': {
    fr: 'Mise en place de pipelines automatisés combinant des scripts d\'ingestion de données, des modèles de langage (LLM) pour la reformulation et la structuration, et des connecteurs CMS pour la publication directe. Orchestration via workflows planifiés avec monitoring et alertes.',
    en: 'Implementation of automated pipelines combining data ingestion scripts, language models (LLM) for reformulation and structuring, and CMS connectors for direct publishing. Orchestration via scheduled workflows with monitoring and alerts.',
  },
  'portfolio.p3.result1': { fr: '100% automatisé — 0 intervention manuelle', en: '100% automated — 0 manual intervention' },
  'portfolio.p3.result2': { fr: 'Gain de productivité estimé à 15h / semaine', en: 'Estimated productivity gain of 15h / week' },
  'portfolio.p3.result3': { fr: 'Publication continue 24/7 sans supervision', en: 'Continuous 24/7 publishing without supervision' },

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
