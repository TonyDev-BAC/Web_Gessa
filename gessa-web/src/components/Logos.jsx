// Recreaciones tipográficas de las marcas GESSA a partir del manual de marca compartido.
// Reemplazar por los archivos SVG/PNG oficiales cuando estén disponibles.

export function GessaWordmark({ className = "", onWhite = false }) {
  return (
    <img
      src={onWhite ? "/logos/fondo_2.png" : "/logos/logo_sin_fondo.png"}
      alt="Gessa"
      className={className}
    />
  );
}

export function PeriLogo({ className = "" }) {
  return (
    <img
      src="/logos/Peri-Mercado.png"
      alt="Peri"
      className={className}
    />
  );
}

export function SuperComproLogo({ className = "" }) {
  return (
    <img
      src="/logos/supercompro.png"
      alt="Super Compro"
      className={className}
    />
  );
}

export function SarettoLogo({ className = "", selecto = false }) {
  return (
    <img
      src="/logos/saretto.png"
      alt="Saretto"
      className={className}
    />
  );
}
  export function SarettoSelectoLogo({ className = "", selecto = false }) {
  return (
    <img
      src="/logos/saretto_selecto.png"
      alt="Saretto Selecto"
      className={className}
    />
  );
}

function CartGlyph({ color }) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" className="text-[1.1em]">
      <path d="M3 4h2l2.2 11.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L20.5 8H6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="10" cy="20" r="1.4" fill={color}/>
      <circle cx="17" cy="20" r="1.4" fill={color}/>
    </svg>
  );
}
