import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Reveal from "./Reveal";

const items = [
  { icon: <MapPin size={20} />, label: "Sucursal principal", value: "Montelimar, Calle Blancos, San José, Costa Rica" },
  { icon: <Phone size={20} />, label: "Teléfono", value: "+506 2247 2300" },
  { icon: <Mail size={20} />, label: "Correo", value: "info@gessa.cr" },
  { icon: <Clock size={20} />, label: "Horario", value: "Lunes a domingo, 7:30 a.m. – 5:30 p.m." },
];

export default function Contact() {
  return (
    <section id="contacto" className="py-28" style={{ backgroundColor: "var(--color-gessa-sand)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <span
            className="font-display font-semibold text-sm tracking-[0.2em] uppercase"
            style={{ color: "var(--color-gessa-red)" }}
          >
            Contacto
          </span>
          <h2 className="font-display font-semibold text-4xl sm:text-5xl mt-3 text-balance">
            Encuéntranos
          </h2>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-stretch">
          <Reveal delay={0.1} className="flex flex-col gap-4">
            {items.map((it) => (
              <div
                key={it.label}
                className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm"
              >
                <span
                  className="shrink-0 rounded-xl p-2.5"
                  style={{ backgroundColor: "rgba(227,30,36,0.1)", color: "var(--color-gessa-red)" }}
                >
                  {it.icon}
                </span>
                <div>
                  <div className="text-xs font-display font-semibold uppercase tracking-wide text-black/40">
                    {it.label}
                  </div>
                  <div className="font-medium mt-0.5">{it.value}</div>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-3xl overflow-hidden shadow-lg h-full min-h-[360px]">
              <iframe
                title="Ubicación GESSA"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4673.362840020643!2d-84.06661651991944!3d9.94942344946366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0e529eea8b8ef%3A0xff0f1ee47d91ee83!2sGESSA%20-%20Grupo%20Empresarial%20de%20Supermercados%20S.A.!5e0!3m2!1ses!2scr!4v1755202778559!5m2!1ses!2scr"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 360 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
