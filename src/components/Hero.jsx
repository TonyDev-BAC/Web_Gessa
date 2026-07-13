import { motion } from "framer-motion";
import { ArrowDown, ShoppingCart } from "lucide-react";
import { PeriLogo, SuperComproLogo, SarettoLogo, SarettoSelectoLogo } from "./Logos";
const stats = [
  { value: "4", label: "marcas" },
  { value: "47+", label: "tiendas" },
  { value: "1000+", label: "colaboradores" },
];

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden pt-24"
      style={{
        background:
          "radial-gradient(120% 100% at 100% 0%, var(--color-gessa-red-dark) 0%, var(--color-gessa-red) 45%, var(--color-gessa-red-deep) 100%)",
      }}
    >
      {/* patrón decorativo */}
      <div className="absolute inset-0 pattern-dots text-white/10 pointer-events-none" />
      <motion.div
        className="absolute -right-32 -top-32 w-[520px] h-[520px] rounded-full bg-white/5 blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -left-24 bottom-0 w-[420px] h-[420px] rounded-full"
        style={{ backgroundColor: "var(--color-gessa-gold)", opacity: 0.12 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center py-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/15 text-white text-sm font-display font-medium px-4 py-1.5 mb-7 backdrop-blur-sm"
          >
            <ShoppingCart size={15} />
            Grupo Empresarial de Supermercados
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-semibold text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.03] text-balance"
          >
            Cuatro marcas.
            <br />
            Una misión: estar
            <br />
            cerca de ti.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg text-white/85 max-w-xl leading-relaxed"
          >
            GESSA reúne a Peri, Super Compro, Saretto y Saretto Selecto: un
            grupo en expansión que combina cercanía, calidad y una propuesta
            comercial pensada para cada comunidad donde tenemos presencia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <a
              href="#marcas"
              className="rounded-full bg-white px-7 py-3.5 font-display font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              style={{ color: "var(--color-gessa-red)" }}
            >
              Conocer nuestras marcas
            </a>
            <a
              href="#nosotros"
              className="rounded-full border border-white/40 text-white px-7 py-3.5 font-display font-semibold hover:bg-white/10 transition-colors"
            >
              Quiénes somos
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-14 flex gap-10"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl sm:text-4xl font-bold text-white">
                  {s.value}
                </div>
                <div className="text-white/70 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="hidden lg:block"
        >
          <BrandStack />
        </motion.div>
      </div>

      <motion.a
        href="#marcas"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        aria-label="Desplázate"
      >
        <ArrowDown size={26} />
      </motion.a>
    </section>
  );
}

function BrandStack() {
  const items = [
    { key: "peri", Logo: PeriLogo, color: "var(--color-peri-red)", offset: "translate-x-0" },
    { key: "supercompro", Logo: SuperComproLogo, color: "var(--color-supercompro-blue)", offset: "translate-x-10" },
    { key: "saretto", Logo: SarettoLogo, color: "var(--color-saretto-plum)", offset: "translate-x-4" },
    { key: "saretto-selecto", Logo: SarettoSelectoLogo, color: "var(--color-selecto-plum)", offset: "translate-x-14" },
  ];
  return (
    <div className="flex flex-col gap-3">
      {items.map((it) => (
        <div
          key={it.key}
          className={`${it.offset} rounded-2xl bg-white/60 backdrop-blur-md border border-white/20 px-5 py-4 w-70 shadow-xl relative`}
        >
          <div className="flex items-left justify-left pl-4 gap-4">
            <it.Logo className="h-20 w-20 object-contain shrink-0" />
          </div>
          <span
            className="absolute top-12 left-3 w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: it.color }}
          />
        </div>
      ))}
    </div>
  );
}
