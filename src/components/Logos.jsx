export function GessaWordmark({ className = "", onWhite = false }) {
  return (
    <img
      src={onWhite ? "/logos/Logo_gessa.png" : "/logos/Logo_gessa_bgn.png"}
      alt="Gessa"
      className={className}
    />
  );
}

export function PeriLogo({ className = "" }) {
  return (
    <img
      src="/imagenes/perimercados01.jpg"
      alt="Peri"
      className={className}
    />
  );
}

export function SuperComproLogo({ className = "" }) {
  return (
    <img
      src="/imagenes/SC.jpg"
      alt="Super Compro"
      className={className}
    />
  );
}

export function SarettoLogo({ className = "", selecto = false }) {
  return (
    <img
      src="/imagenes/saretto-selecto.png"
      alt="Saretto"
      className={className}
    />
  );
}

export function SuperViquezLogo({ className = "" }) {
  return (
    <img
      src="/imagenes/SV.jpg"
      alt="Super Víquez"
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
