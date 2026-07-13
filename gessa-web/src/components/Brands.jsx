import { motion } from "framer-motion";
import { Store, ArrowUpRight } from "lucide-react";
import { brands } from "../data/brands";
import Reveal from "./Reveal";

export default function Brands() {
  return (
    <section id="marcas" className="py-28 bg-gessa-cream" style={{ backgroundColor: "var(--color-gessa-cream)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <span
            className="font-display font-semibold text-sm tracking-[0.2em] uppercase"
            style={{ color: "var(--color-gessa-red)" }}
          >
            Nuestras marcas
          </span>
          <h2 className="font-display font-semibold text-4xl sm:text-5xl mt-3 max-w-2xl text-balance">
            Una familia de marcas, cada una con su propia identidad
          </h2>
          <p className="mt-4 text-lg text-black/60 max-w-2xl">
            Cada marca de GESSA está diseñada para responder a las
            necesidades y el estilo de vida de la comunidad donde opera.
          </p>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 gap-6">
          {brands.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative rounded-3xl bg-white border border-black/5 p-8 h-full overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
              >
                <div
                  className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{ backgroundColor: b.color }}
                />
                <div className="relative flex items-start justify-between">
                  <div
                    className="flex items-center gap-2 text-xs font-display font-semibold uppercase tracking-wider rounded-full px-3 py-1"
                    style={{ backgroundColor: `color-mix(in srgb, ${b.color} 15%, white)`, color: b.color }}
                  >
                    <Store size={13} />
                    {b.stores}
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-black/20 group-hover:text-black/60 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                  />
                </div>

                <h3 className="relative font-display font-bold text-3xl mt-6">
                  {b.name}
                </h3>
                <p className="relative text-sm font-semibold mt-1" style={{ color: b.color }}>
                  {b.tag}
                </p>
                <p className="relative mt-4 text-black/60 leading-relaxed">
                  {b.description}
                </p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
