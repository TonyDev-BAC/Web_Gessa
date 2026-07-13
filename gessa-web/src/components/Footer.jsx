import { Briefcase, Building2 } from "lucide-react";
import { GessaWordmark } from "./Logos";
import { brands } from "../data/brands";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ backgroundColor: "var(--color-gessa-ink)" }} className="text-white/70 pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="text-4xl mb-4">
              <GessaWordmark onWhite />
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Grupo Empresarial de Supermercados S.A. Cuatro marcas, una
              misión: estar cerca de ti.
            </p>
            <div className="flex gap-3 mt-5">
              <SocialIcon><InstagramGlyph /></SocialIcon>
              <SocialIcon><FacebookGlyph /></SocialIcon>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              Marcas
            </h4>
            <ul className="space-y-2.5 text-sm">
              {brands.map((b) => (
                <li key={b.id}>
                  <a href="#marcas" className="hover:text-white transition-colors">
                    {b.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              Compañía
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#nosotros" className="hover:text-white transition-colors">Nosotros</a></li>
              <li><a href="#contacto" className="hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div id="futuro">
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              Próximamente
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 opacity-60">
                <Briefcase size={15} /> Bolsa de empleo
              </li>
              <li className="flex items-center gap-2 opacity-60">
                <Building2 size={15} /> Portal corporativo
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/40">
          <span>© {year} Gessa - Grupo Empresarial de Supermercados S.A. Todos los derechos reservados.</span>
          <span>Diseñado con enfoque en cercanía, calidad y comunidad.</span>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ children }) {
  return (
    <a
      href="#"
      className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
    >
      {children}
    </a>
  );
}

function InstagramGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.3c0-.87.24-1.46 1.5-1.46H16.5V4.14C16.2 4.1 15.2 4 14 4c-2.5 0-4.2 1.53-4.2 4.34V10.5H7.3v3h2.5V21h3.7z" />
    </svg>
  );
}
