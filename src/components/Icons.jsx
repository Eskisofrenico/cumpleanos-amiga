export const Heart = ({ size = 24, fill = "none", stroke = "currentColor", strokeWidth = 2 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const Gift = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
  >
    <defs>
      <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#e63946', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d62828', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#e8e8e8', stopOpacity: 1 }} />
        <stop offset="50%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#c0c0c0', stopOpacity: 1 }} />
      </linearGradient>
    </defs>

    {/* Caja principal */}
    <rect x="15" y="40" width="70" height="50" rx="3" fill="url(#redGradient)" stroke="#b71c1c" strokeWidth="1.5"/>
    
    {/* Sombra inferior */}
    <rect x="18" y="87" width="64" height="3" rx="1" fill="rgba(0,0,0,0.2)"/>
    
    {/* Cinta vertical */}
    <rect x="45" y="35" width="10" height="55" fill="url(#silverGradient)" stroke="#a0a0a0" strokeWidth="0.8"/>
    
    {/* Cinta horizontal */}
    <rect x="12" y="55" width="76" height="10" fill="url(#silverGradient)" stroke="#a0a0a0" strokeWidth="0.8"/>
    
    {/* Moño - lazo izquierdo */}
    <ellipse cx="35" cy="35" rx="18" ry="12" fill="url(#silverGradient)" stroke="#a0a0a0" strokeWidth="1"/>
    
    {/* Moño - lazo derecho */}
    <ellipse cx="65" cy="35" rx="18" ry="12" fill="url(#silverGradient)" stroke="#a0a0a0" strokeWidth="1"/>
    
    {/* Centro del moño */}
    <circle cx="50" cy="35" r="8" fill="url(#silverGradient)" stroke="#a0a0a0" strokeWidth="1"/>
    
    {/* Cintas colgantes izquierda */}
    <path d="M45 43 L40 60 L42 62 L47 45 Z" fill="url(#silverGradient)" stroke="#a0a0a0" strokeWidth="0.5"/>
    
    {/* Cintas colgantes derecha */}
    <path d="M55 43 L60 60 L58 62 L53 45 Z" fill="url(#silverGradient)" stroke="#a0a0a0" strokeWidth="0.5"/>
    
    {/* Brillo en la caja */}
    <rect x="18" y="43" width="25" height="15" rx="2" fill="rgba(255,255,255,0.15)"/>
    
    {/* Brillo en el moño */}
    <ellipse cx="48" cy="32" rx="4" ry="2" fill="rgba(255,255,255,0.6)"/>
  </svg>
);

export const ChevronLeft = ({ size = 24, stroke = "currentColor", strokeWidth = 2 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export const ChevronRight = ({ size = 24, stroke = "currentColor", strokeWidth = 2 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export const ArrowUp = ({ size = 24, stroke = "currentColor", strokeWidth = 2 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </svg>
);