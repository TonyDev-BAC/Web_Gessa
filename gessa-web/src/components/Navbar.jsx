import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Briefcase, Building2 } from "lucide-react";
import { GessaWordmark } from "./Logos";

const links = [
  { href: "#marcas", label: "Marcas" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-18 py-3">
        <a href="#inicio" className="text-3xl">
          <GessaWordmark onWhite={scrolled} />
        </a>

        <nav className="hidden md:flex items-center gap-8 font-display text-sm font-medium tracking-wide">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-[var(--color-gessa-red)] text-gessa-ink"
            >
              {l.label}
            </a>
          ))}
          <div className="w-px h-5 bg-black/10" />
          <a
            href="#futuro"
            className="flex items-center gap-1.5 opacity-60 cursor-default"
            title="Próximamente"
          >
            <Briefcase size={15} /> Bolsa de empleo
          </a>
          <a
            href="#contacto"
            className="rounded-full px-5 py-2.5 text-white font-semibold shadow-sm hover:shadow-md transition-shadow"
            style={{ backgroundColor: "var(--color-gessa-red)" }}
          >
            Contáctanos
          </a>
        </nav>

        <button
          className="md:hidden p-2 text-gessa-ink"
          onClick={() => setOpen((o) => !o)}
          aria-label="Abrir menú"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-white border-t border-black/5"
          >
            <div className="flex flex-col px-6 py-4 gap-4 font-display font-medium">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              ))}
              <a href="#futuro" className="flex items-center gap-2 opacity-60">
                <Briefcase size={16} /> Bolsa de empleo (próximamente)
              </a>
              <a href="#futuro" className="flex items-center gap-2 opacity-60">
                <Building2 size={16} /> Portal corporativo (próximamente)
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
