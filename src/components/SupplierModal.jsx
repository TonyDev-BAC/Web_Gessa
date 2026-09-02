import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Check, ChevronDown, Loader2, Store, X } from "lucide-react";
import { supplierCategories } from "../data/supplierCategories";


const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const DIACRITICS_REGEX = new RegExp("[\\u0300-\\u036f]", "g");
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeForSearch(s) {
  return s.normalize("NFD").replace(DIACRITICS_REGEX, "").toLowerCase();
}

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-gessa-red)]";

function CategoryCombobox({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const filtered = supplierCategories.filter((c) =>
    normalizeForSearch(c.label).includes(normalizeForSearch(query))
  );

  const selected = supplierCategories.find((c) => c.id === value);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${inputClass} flex items-center justify-between gap-2 text-left ${
          selected ? "text-gessa-ink" : "text-black/40"
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected ? selected.label : "Selecciona una categoría"}
        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-black/10 bg-white shadow-lg"
          >
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar categoría..."
              className="w-full border-b border-black/10 px-4 py-2.5 text-sm outline-none"
            />
            <ul role="listbox" className="max-h-56 overflow-y-auto py-1">
              {filtered.length === 0 && (
                <li className="px-4 py-2.5 text-sm text-black/40">Sin resultados</li>
              )}
              {filtered.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={c.id === value}
                    onClick={() => {
                      onChange(c.id);
                      setQuery("");
                      setOpen(false);
                    }}
                    className="flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-sm hover:bg-[var(--color-gessa-sand)]"
                  >
                    {c.label}
                    {c.id === value && (
                      <Check size={16} style={{ color: "var(--color-gessa-red)" }} />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const initialForm = {
  companyName: "",
  contactName: "",
  phone: "",
  email: "",
  categoryId: "",
  message: "",
};

export default function SupplierModal({ open, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(initialForm);
      setStatus("idle");
      setEmailError("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const category = supplierCategories.find((c) => c.id === form.categoryId);
    if (!category) return;

    if (!EMAIL_REGEX.test(form.email.trim())) {
      setEmailError("Ingresa un correo electrónico válido.");
      return;
    }
    setEmailError("");

    setStatus("sending");

    const summary = `${form.companyName} quiere ser proveedor de GESSA. Categoría: ${category.label}. Teléfono: ${form.phone}.`;

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: category.managerEmail,
          category_label: category.label,
          company_name: form.companyName,
          contact_name: form.contactName,
          phone: form.phone,
          email: form.email,
          message: form.message,
          summary,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus("success");
    } catch (err) {
      console.error("Error enviando solicitud de proveedor:", err);
      setStatus("error");
    }
  }

  // El modal se monta en <body> con un portal: el <header> que lo renderiza es
  // fixed + backdrop-blur al hacer scroll, y ese backdrop-filter se vuelve el
  // containing block de los hijos position:fixed, lo que descentraba el overlay.
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-8 shadow-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="supplier-modal-title"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-5 top-5 rounded-full p-1.5 text-black/40 transition-colors hover:bg-black/5 hover:text-black"
            >
              <X size={20} />
            </button>

            <h2
              id="supplier-modal-title"
              className="font-display font-semibold text-2xl sm:text-3xl mt-4 text-balance"
            >
              Quiero ser proveedor
            </h2>
            <p className="text-sm text-black/60 mt-2">
              Cuéntanos sobre tu empresa y en qué categoría quieres ofrecer tus productos.
              Le avisaremos directamente al encargado correspondiente.
            </p>

            {status === "success" ? (
              <div className="mt-8 rounded-2xl bg-[var(--color-gessa-sand)] p-6 text-center">
                <p className="font-display font-semibold text-lg">¡Solicitud enviada!</p>
                <p className="text-sm text-black/60 mt-1">
                  Le avisamos al encargado de la categoría. Pronto se pondrán en contacto contigo.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-5 rounded-full px-5 py-2.5 text-white font-semibold text-sm"
                  style={{ backgroundColor: "var(--color-gessa-red)" }}
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                <div>
                  <label className="text-xs font-display font-semibold uppercase tracking-wide text-black/40">
                    Nombre de la empresa
                  </label>
                  <input
                    required
                    value={form.companyName}
                    onChange={(e) => update("companyName", e.target.value)}
                    className={`${inputClass} mt-1.5`}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-display font-semibold uppercase tracking-wide text-black/40">
                      Nombre de contacto
                    </label>
                    <input
                      required
                      value={form.contactName}
                      onChange={(e) => update("contactName", e.target.value)}
                      className={`${inputClass} mt-1.5`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-display font-semibold uppercase tracking-wide text-black/40">
                      Teléfono
                    </label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className={`${inputClass} mt-1.5`}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-display font-semibold uppercase tracking-wide text-black/40">
                    Correo electrónico
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      update("email", e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    onBlur={() => {
                      if (form.email && !EMAIL_REGEX.test(form.email.trim())) {
                        setEmailError("Ingresa un correo electrónico válido.");
                      }
                    }}
                    aria-invalid={emailError ? "true" : "false"}
                    className={`${inputClass} mt-1.5 ${
                      emailError ? "border-[var(--color-gessa-red)]" : ""
                    }`}
                  />
                  {emailError && (
                    <p className="mt-1.5 text-xs text-[var(--color-gessa-red)]">{emailError}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-display font-semibold uppercase tracking-wide text-black/40">
                    Categoría a la que quiere ser proveedor
                  </label>
                  <div className="mt-1.5">
                    <CategoryCombobox
                      value={form.categoryId}
                      onChange={(id) => update("categoryId", id)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-display font-semibold uppercase tracking-wide text-black/40">
                    Mensaje (opcional)
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className={`${inputClass} mt-1.5 resize-none`}
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-[var(--color-gessa-red)]">
                    No se pudo enviar la solicitud. Intenta de nuevo en unos minutos.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending" || !form.categoryId}
                  className="mt-2 flex items-center justify-center gap-2 rounded-full px-5 py-3 text-white font-semibold shadow-sm transition-shadow hover:shadow-md disabled:opacity-60"
                  style={{ backgroundColor: "var(--color-gessa-red)" }}
                >
                  {status === "sending" && <Loader2 size={18} className="animate-spin" />}
                  {status === "sending" ? "Enviando..." : "Enviar solicitud"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
