import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import { PeriLogo, SuperComproLogo, SarettoLogo, SuperViquezLogo } from "./Logos";
const stats = [
  { value: "4", label: "marcas" },
  { value: "57", label: "tiendas" },
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

            <img
              src="\logos\Linea.png"
              alt="Ilustración de un supermercado con un carrito de compras lleno de productos"
              className="w-full max-w-lg mx-0"
            />
      

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
            cerca de vos.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg text-white/85 max-w-xl leading-relaxed"
          >
            GESSA reúne a Perimercados, Super Compro, Saretto y Super
            Víquez: un grupo en expansión que combina cercanía, calidad y una
            propuesta comercial pensada para cada comunidad donde tenemos
            presencia.
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
          <BrandCarousel />
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

const slides = [
  { key: "peri", Logo: PeriLogo, name: "Perimercados", color: "var(--color-peri-red)" },
  { key: "supercompro", Logo: SuperComproLogo, name: "Super Compro", color: "var(--color-supercompro-blue)" },
  { key: "saretto", Logo: SarettoLogo, name: "Saretto", color: "var(--color-saretto-plum)" },
  { key: "super-viquez", Logo: SuperViquezLogo, name: "Super Víquez", color: "var(--color-viquez-green)" },
];

const AUTOPLAY_MS = 5000;

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 90 : -90, opacity: 0, scale: 0.94 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? -90 : 90, opacity: 0, scale: 0.94 }),
};

function BrandCarousel() {
  const [[index, direction], setSlide] = useState([0, 0]);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir) => {
    setSlide(([i]) => [(i + dir + slides.length) % slides.length, dir]);
  }, []);

  const goTo = useCallback((next) => {
    setSlide(([i]) => [next, next > i ? 1 : -1]);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, go, index]);

  const active = slides[index];

  return (
    <div
      className="relative w-full max-w-md mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Marcas de GESSA"
    >
      {/* halo de color según la marca activa */}
      <motion.div
        aria-hidden
        className="absolute -inset-8 rounded-[3rem] blur-3xl pointer-events-none"
        animate={{ backgroundColor: active.color, opacity: 0.35 }}
        transition={{ duration: 0.6 }}
      />

      <div className="relative aspect-[4/5] rounded-[2rem] shadow-2xl ring-1 ring-white/40 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={active.key}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60 || info.velocity.x < -400) go(1);
              else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            aria-roledescription="diapositiva"
            aria-label={`${index + 1} de ${slides.length}: ${active.name}`}
          >
            <active.Logo className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* franja de color de marca */}
        <motion.div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-1.5 z-10"
          animate={{ backgroundColor: active.color }}
          transition={{ duration: 0.5 }}
        />

        {/* velo inferior para legibilidad de los controles */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 via-black/15 to-transparent pointer-events-none" />

        {/* controles */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-4 py-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Marca anterior"
            className="rounded-full p-2 text-white bg-white/15 backdrop-blur-md hover:bg-white/25 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.key}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir a ${s.name}`}
                aria-current={i === index}
                className="h-2.5 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? "1.75rem" : "0.625rem",
                  backgroundColor: i === index ? s.color : "rgba(255,255,255,0.45)",
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Marca siguiente"
            className="rounded-full p-2 text-white bg-white/15 backdrop-blur-md hover:bg-white/25 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* barra de progreso del autoplay */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-10">
          <motion.div
            key={`${index}-${paused}`}
            className="h-full"
            style={{ backgroundColor: active.color }}
            initial={{ width: paused ? "100%" : "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}
