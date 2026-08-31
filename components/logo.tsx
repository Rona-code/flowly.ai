export function Logo({ className = "size-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Fond avec dégradé moderne */}
      <rect width="100" height="100" rx="24" fill="url(#flowly-grad)" />

      {/* Symbole de l'infini (∞) centré */}
      <path
        d="M30 65C21 65 14 58 14 50C14 42 21 35 30 35C41 35 50 50 50 50C50 50 59 35 70 35C79 35 86 42 86 50C86 58 79 65 70 65C59 65 50 50 50 50C50 50 41 65 30 65Z"
        stroke="white"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Lettre F à l'intérieur de la boucle droite */}
      <g fill="white">
        <rect x="67" y="42" width="3.5" height="16" rx="1.75" />
        <rect x="67" y="42" width="9" height="3" rx="1.5" />
        <rect x="67" y="48.5" width="7" height="2.5" rx="1.25" />
      </g>

      {/* Point jaune discret + mention "ai" dans le coin inférieur droit */}
      <g>
        {/* Le petit point jaune */}
        <circle cx="70" cy="80" r="2.5" fill="#FFD166" />

        {/* Lettres 'a' et 'i' discrètes en blanc */}
        <path
          d="M76 81.5V78.5C76 77.5 77 77 78 77C79 77 80 77.5 80 78.5V81.5M76 79.5H80"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M83.5 77.5V81.5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="83.5" cy="75.5" r="1" fill="white" />
      </g>

      {/* Dégradé de la marque */}
      <defs>
        <linearGradient
          id="flowly-grad"
          x1="0"
          y1="0"
          x2="100"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--primary))" />
          <stop offset="1" stopColor="#FF5252" />
        </linearGradient>
      </defs>
    </svg>
  )
}