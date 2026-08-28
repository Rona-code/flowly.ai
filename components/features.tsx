import { Brain, CloudOff, Gauge, Infinity as InfinityIcon, ShieldCheck, Wand2 } from 'lucide-react'

const FEATURES = [
  {
    icon: Brain,
    title: 'IA générative de vide',
    desc: 'Notre modèle génère du contenu à partir de rien et vous restitue exactement ça : rien, mais bien présenté.',
  },
  {
    icon: Gauge,
    title: 'Latence infinie',
    desc: 'Optimisé pour prendre son temps. Chaque réponse est mûrement réfléchie, puis abandonnée.',
  },
  {
    icon: CloudOff,
    title: 'Cloud hors-ligne',
    desc: 'Vos données sont stockées dans un cloud que même nous n\u2019arrivons pas à joindre. Sécurité maximale.',
  },
  {
    icon: InfinityIcon,
    title: 'Scalabilité illimitée',
    desc: 'Passez de 0 à 0 utilisateur actif sans le moindre ralentissement. Impressionnant.',
  },
  {
    icon: ShieldCheck,
    title: 'Conforme à tout',
    desc: 'RGPD, SOC 2, ISO 9001, feng shui. On a coché toutes les cases sans les lire.',
  },
  {
    icon: Wand2,
    title: 'Automatisation magique',
    desc: 'Automatise vos tâches en les ignorant à votre place. Un vrai gain de temps théorique.',
  },
]

export function Features() {
  return (
    <section id="features" className="border-y border-border/60 bg-card/30">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 font-mono text-sm uppercase tracking-widest text-primary">
            Fonctionnalités
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Tout ce dont vous n&apos;avez absolument pas besoin
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group bg-background p-8 transition-colors hover:bg-card"
            >
              <span className="mb-5 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:-rotate-6">
                <f.icon className="size-5" />
              </span>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
