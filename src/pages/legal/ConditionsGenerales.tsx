import { LegalLayout } from './LegalLayout'

export function ConditionsGenerales() {
  return (
    <LegalLayout>
      <div>
        <p className="text-sm font-semibold tracking-widest text-gold uppercase mb-3">
          Légal
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-balance">
          Conditions Générales (CGV / CGU)
        </h1>
      </div>

      <div className="space-y-8 text-muted-foreground leading-7">
        <section className="space-y-3">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground">
            Objet
          </h2>
          <p>
            Les présentes conditions générales régissent les prestations de développement,
            d'audit cyber et d'intégration IA fournies par Nelo | Digital &amp; IA à des
            professionnels.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground">
            Devis et Paiement
          </h2>
          <p>
            Les devis émis sont valables 30 jours à compter de leur date d'émission. Un acompte
            est requis au démarrage du projet, le solde étant payable à la livraison.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground">
            Propriété
          </h2>
          <p>
            Le transfert des droits (code, architectures, scripts) au client s'effectue après
            paiement total de la facture. Jusqu'à complet paiement, l'ensemble des livrables
            reste la propriété de Nelo | Digital &amp; IA.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-foreground">
            Responsabilité
          </h2>
          <p>
            Nelo | Digital &amp; IA s'engage à une obligation de moyens concernant l'intégration
            de l'intelligence artificielle et la mise en œuvre de mesures de cybersécurité.
            Aucune garantie de résultat ne peut être formulée, ces domaines étant par nature
            évolutifs et contingents.
          </p>
        </section>
      </div>
    </LegalLayout>
  )
}
