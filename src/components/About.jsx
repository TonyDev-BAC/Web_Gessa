import { Target, Eye, Heart } from "lucide-react";
import { values } from "../data/brands";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="nosotros" className="py-28" style={{ backgroundColor: "var(--color-gessa-ink)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <span
              className="font-display font-semibold text-sm tracking-[0.2em] uppercase"
              style={{ color: "var(--color-gessa-gold)" }}
            >
              Quiénes somos
            </span>
            <h2 className="font-display font-semibold text-4xl sm:text-5xl mt-3 text-white text-balance">
              Un grupo empresarial con raíces y visión de crecimiento
            </h2>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              GESSA es un grupo empresarial de supermercados comprometido con
              la calidad, la cercanía y la satisfacción de sus clientes.
              Nuestra familia está conformada por marcas que se adaptan a las
              necesidades y estilos de vida de cada comunidad donde estamos
              presentes.
            </p>
            <p className="mt-4 text-lg text-white/70 leading-relaxed">
              Con el respaldo de un grupo en expansión, seguimos invirtiendo
              en nuestras tiendas y en nuestra gente para ofrecer, todos los
              días, la mejor experiencia de compra.
            </p>
          </Reveal>

          <div className="grid gap-6">
            <Reveal delay={0.1}>
              <InfoCard
                icon={<Eye size={22} />}
                title="Visión"
                text="Ser el minorista que más contribuye al bienestar de la familia costarricense, ofreciendo la mejor propuesta comercial y cerca de las comunidades."
              />
            </Reveal>
            <Reveal delay={0.18}>
              <InfoCard
                icon={<Target size={22} />}
                title="Misión"
                text="Cada día y en cada acción ponemos en el centro de todo a nuestros clientes, para crear una experiencia de satisfacción que los lleve a preferirnos."
              />
            </Reveal>
            <Reveal delay={0.26}>
              <div className="rounded-3xl bg-white/5 border border-white/10 p-7">
                <div className="flex items-center gap-3 text-white mb-4">
                  <Heart size={22} style={{ color: "var(--color-gessa-gold)" }} />
                  <h3 className="font-display font-semibold text-xl">
                    Valores
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {values.map((v) => (
                    <span
                      key={v}
                      className="rounded-full border border-white/15 text-white/80 text-sm px-4 py-1.5 hover:border-white/40 hover:text-white transition-colors"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-7">
      <div className="flex items-center gap-3 text-white mb-3">
        <span style={{ color: "var(--color-gessa-gold)" }}>{icon}</span>
        <h3 className="font-display font-semibold text-xl">{title}</h3>
      </div>
      <p className="text-white/70 leading-relaxed">{text}</p>
    </div>
  );
}
