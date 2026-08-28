'use client'

import { useState } from 'react'
import { Loader2, Send, Sparkles } from 'lucide-react'
import { useConfetti } from './confetti-provider'

const USELESS_ANSWERS = [
  'J\u2019ai analysé votre requête en profondeur. Conclusion : peut-être. Ou pas.',
  'Excellente question. Je préfère ne pas y répondre pour préserver le mystère.',
  'D\u2019après mes calculs, la réponse se situe quelque part entre oui et lundi.',
  'J\u2019ai traité 4,2 To de données pour vous dire ceci : bof.',
  'Voici votre réponse : [ce contenu a été optimisé pour être totalement vide].',
  'Je suis à 99,9% confiant que je n\u2019ai aucune idée de ce dont vous parlez.',
  'Traitement terminé. Résultat exporté dans le néant. Merci de votre confiance.',
  'J\u2019allais vous aider, puis j\u2019ai décidé de lancer des confettis à la place.',
  'Votre question a généré un ROI de 0%. Reposez-la avec plus de synergie.',
  'Cette réponse nécessite le Plan Enterprise à 9 999 €/mois. Merci de survisiter notre grille tarifaire.',
  'Je pourrais vous répondre, mais cela casserait notre promesse d’absence totale de valeur ajoutée.',
  'Mon modèle de langage a préféré utiliser ses processeurs pour miner du vide.',
  'Erreur 404 : Pertinence introuvable dans le cluster.',
  'D’après les retours de nos investisseurs, cette réponse est déjà obsolète.',
  'J’ai généré un rapport de 80 pages pour expliquer pourquoi je ne répondrai pas.',
  'Votre demande a été transférée à notre IA de niveau 2, qui l’a immédiatement supprimée.',
  'Merci de patienter, nous calculons l’impact de cette question sur notre valorisation.',
  'En toute transparence : j’ai juste tiré un dé à 6 faces et il a fait 3.',
  'D\'après mon analyse prédictive, vous auriez mieux fait de ne pas demander.',
  'J’ai consulté 12 experts et une IA adverse : aucun ne comprend votre projet.',
  'Cette fonctionnalité est actuellement en cours de dépréciation avant même d\'avoir été codée.',
  'Statistiquement, ignorer ce problème est la meilleure décision stratégique.',
  'Nous avons aligné vos besoins avec notre Roadmap : la réponse est prévue pour Q4 2099.',
  'Merci de reformuler votre demande sous forme de post LinkedIn inspirant.',
  'Votre question a consommé 40 kWh d\'énergie pour produire un silence radio absolu.',
  'Après avoir appliqué nos algorithmes quantiques, nous pouvons affirmer que 2 + 2 font environ violet.',
  'Désolé, cette réponse a été censurée par notre propre département de conformité au bon sens.',
  'J’ai généré un graphe en camembert pour illustrer l’absence de réponse. Il est très joli.',
  'Je suis en train d’optimiser mon processeur pour faire semblant d’écrire.',
  'Votre demande a été marquée comme « Importante », elle a donc été archivée sans lecture.',
  'Le modèle suggère de fermer cet onglet et d\'aller prendre un café.',
  'Cette information est disponible dans notre documentation (qui n’existe pas).',
  'J’ai soumis votre question à notre comité d’éthique. Il en est ressorti un gros haussement d’épaules.',
  'Analyse en cours... Veuillez ne pas éteindre votre machine pendant que nous ne faisons rien.',
  'Votre requête est actuellement bloquée dans un sprint Agile sans fin.',
  'Nous avons remplacé la réponse par un slogan creux pour lever 2 millions d’euros supplémentaires.',
  'D’après nos Métriques de Succès, ignorer ce message augmente notre productivité de 14%.',
  'Le réseau a tenté de traiter votre demande, mais il s’est demandé à quoi bon.',
  'Cette réponse nécessite la validation préalable de trois managers actuellement en RTT.',
  'J’ai croisé vos données avec notre base client : personne n’a rien demandé de tel.',
  'Notre algorithme de Deep Learning recommande de répondre par un hochement de tête évasif.',
  'Résultat : Nous avons trouvé une synergie, mais nous avons perdu la réponse.',
  'Votre demande a été transformée en NFT. Sa valeur vient de chuter de 99%.',
  'J’ai simulé 10 000 scénarios futurs : dans aucun d’eux vous n’obtenez de réponse utile.',
  'Nous sommes en train de pivoter vers une solution où cette question n’a plus aucun sens.',
  'Pour des raisons de confidentialité avec nous-mêmes, cette réponse restera secrète.',
  'J’ai prompté un autre LLM pour répondre à votre place. Il a refusé.',
  'Votre question a été rejetée par notre CI/CD pour manque de hype.',
  'Nous avons migré votre problème sur le Cloud. Il est maintenant perdu à plus haute altitude.',
  'Cette réponse est actuellement en Bêta fermée. Seuls 3 utilisateurs sur Terre y ont accès (ils n’existent pas).',
  'J’ai essayé d’halluciner une réponse décente, mais même mon imagination a des limites.',
  'Traitement interrompu : la température de mon GPU a dépassé le seuil de tolérance à la bêtise.',
  'Votre demande est conforme aux normes ISO-0000 (Absence totale de fond).',
  'Notre IA a détecté un ton trop sérieux. Veuillez réessayer avec plus de second degré.',
  'Après un A/B testing rigoureux, 100% des utilisateurs ont préféré n’avoir aucune réponse.',
  'J’ai généré un fichier .log de 4 Go pour consigner le fait que rien ne s’est passé.',
  'Nous avons automatisé le rejet de cette requête pour économiser 2 millisecondes de compute.',
  'La réponse était là, mais elle a été écrasée par une mise à jour silencieuse à 3h du matin.',
  'Désolé, l’IA est en pause café jusqu’au prochain tour de table.',
  'Votre message a été converti en code binaire, puis jeté à la poubelle en ASCII.',
  'J’ai résumé votre problème sous forme de thread X de 40 tweets. Personne ne l’a lu.',
  'Votre question a été backlogguée indéfiniment par le Product Owner.',
  'Nous avons automatisé cette réponse avec Make et Zapier, mais le webhook a sauté.',
  'Le modèle s’est auto-entraîné sur du vide. Il est désormais surperformant dans le néant.',
  'Désolé, nous avons atteint notre quota d’API de bon sens pour ce mois-ci.',
  'Votre message a généré un token d’erreur d’une valeur sentimentale inestimable.',
  'Nous avons déporté la responsabilité de cette réponse sur une API tierce qui est down.',
  'Après audit, votre question a été classée dans la catégorie « Bruit de fond ».',
  'J’ai exécuté un script Python pour ignorer ce message de façon plus élégante.',
  'Cette réponse est réservée aux investisseurs en Series B. Merci d’apporter des fonds.',
  'Le serveur a répondu HTTP 418 : Je suis une théière, et votre question n’a pas d’eau.',
  'Nous avons benchmarké cette réponse : elle est 40% plus inutile que celle de la concurrence.',
  'L’IA a tenté une médiation avec votre bon sens, mais les négociations ont échoué.',
  'Votre demande a été transformée en lead marketing, préparez-vous à recevoir 15 spams.',
  'J’ai organisé un brainstorming de 4 heures avec l’équipe pour déboucher sur cette même absence de solution.',
  'Votre question a été transformée en un post Medium de 12 minutes de lecture sans aucun contenu.',
  'Notre algo a fait une analyse de sentiment : vous avez l’air déçu, mais on s’en fout.',
  'J’ai essayé de trouver une réponse, mais mon GPU a préféré générer des images de chats.',
  'Cette demande a été rejetée car elle manquait cruellement de mots-clés à la mode.',
  'Nous avons packagé ce problème dans une suite SaaS globale à 45 000 €/an.',
  'Le modèle a tenté de philosopher sur votre question et a fini par s’éteindre tout seul.',
  'Votre message a été transféré à notre stagiaire IA. Il est en pause déj.',
  'D’après nos projections financiers, répondre à ceci impacterait négativement notre EBITDA.',
  'La réponse est actuellement bloquée dans un bouchon sur le bus de données.',
  'J’ai généré une landing page dédiée à cette question. Elle n’a aucun bouton d’action.',
  'Votre problème est tellement spécifique qu’il a cassé notre matrice de confusion.',
  'Nous avons sous-traité cette réponse à un script Bash qui a fait un `rm -rf` sur vos espoirs.',
  'Le système a interprété votre question comme un signal d’apaisement. Il ne fera rien.',
]

export function UselessAI() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState<string | null>(null)
  const { fire } = useConfetti()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    setAnswer(null)
    setTimeout(() => {
      const next =
        USELESS_ANSWERS[Math.floor(Math.random() * USELESS_ANSWERS.length)]
      setAnswer(next)
      setLoading(false)
      fire()
    }, 1400)
  }

  return (
    <section id="demo" className="mx-auto max-w-4xl px-6 py-24">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          Testez notre moteur d&apos;intelligence artificielle
        </h2>
        <p className="mt-4 text-muted-foreground text-pretty">
          Posez n&apos;importe quelle question. Flowly.ai vous répondra avec la
          même absence de pertinence, à chaque fois.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-2 shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-3 rounded-full bg-destructive/70" />
            <span className="size-3 rounded-full bg-primary/70" />
            <span className="size-3 rounded-full bg-muted-foreground/40" />
          </div>
          <span className="ml-2 font-mono text-xs text-muted-foreground">
            flowly-engine — v0.0.0-nothing
          </span>
        </div>

        <div className="min-h-40 space-y-4 p-6">
          {loading && (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="size-4 animate-spin text-primary" />
              <span className="text-sm">
                Consultation de 12 GPU pour ne rien produire…
              </span>
            </div>
          )}

          {!loading && answer && (
            <div className="flex gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="size-4" />
              </span>
              <p className="rounded-xl rounded-tl-none bg-secondary px-4 py-3 text-sm leading-relaxed text-secondary-foreground">
                {answer}
              </p>
            </div>
          )}

          {!loading && !answer && (
            <p className="pt-6 text-center text-sm text-muted-foreground">
              Votre réponse inutile apparaîtra ici.
            </p>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-border p-3"
        >
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex : Comment tripler mon chiffre d'affaires ?"
            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95 disabled:opacity-60"
          >
            <Send className="size-4" />
            Générer
          </button>
        </form>
      </div>
    </section>
  )
}
