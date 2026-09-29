import { LegalLayout } from './LegalLayout'

export function ConditionsGenerales() {
  return (
    <LegalLayout>
      <div>
        <p className="text-sm font-semibold tracking-widest text-gold uppercase mb-3">Légal</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-balance">Conditions générales</h1>
      </div>

      <div className="space-y-8 text-muted-foreground leading-7">
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Objet</h2>
          <p>
            Les présentes conditions régissent la création d’un site de réservation pour un hôtel
            indépendant, vendu par Nelo sous l’une des trois formules : Découverte (450 €, 14 jours),
            Essentiel (990 €, 21 jours), Complet (2 900 €, 30 jours). Ces prix couvrent jusqu’à 15
            chambres. Chaque chambre au-dessus ajoute 15 €.
          </p>
          <p>
            Un restaurant, une gelateria ou toute autre prestation fait l’objet d’un devis séparé.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Délai</h2>
          <p>
            Le délai de la formule commence le jour où l’acompte, les textes et les photos sont
            reçus. Un retard du client sur ces éléments décale le délai d’autant.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Garantie de délai</h2>
          <p>
            Si le délai est dépassé du fait de Nelo, le mois d’hébergement suivant la première année
            est offert. Chaque formule inclut deux séries de modifications. Cette garantie ne porte
            pas sur un nombre de réservations, de nuitées ou de chiffre d’affaires.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Paiement</h2>
          <p>
            Un acompte est demandé au démarrage. Le solde est payable à la livraison. Le devis est
            valable 30 jours. Le nom de domaine .com et l’hébergement de la première année sont
            inclus. Une extension locale se paie au tarif du registrar.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Propriété</h2>
          <p>
            Le transfert des droits sur le site livré s’effectue après paiement total. Jusqu’à
            complet paiement, les livrables restent la propriété de Nelo.
          </p>
        </section>
      </div>
    </LegalLayout>
  )
}
