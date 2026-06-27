import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setError("Configure a chave VITE_WEB3FORMS_ACCESS_KEY para ativar o envio do formulário.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.append("access_key", accessKey);
      formData.append("subject", "Novo pedido de diagnóstico - RAOS Tecnologia");
      formData.append("from_name", "Site RAOS Tecnologia");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Não foi possível enviar sua mensagem agora.");
      }

      setSent(true);
      setForm({ name: "", email: "", company: "", service: "", message: "" });
    } catch {
      setError("Não foi possível enviar agora. Tente novamente ou fale conosco pelo WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-[#1A1A2E] border border-[#7C3AED]/20 rounded-xl px-4 py-3 text-[#EEEEF5] text-sm placeholder:text-[#8888A8] focus:outline-none focus:border-[#7C3AED] transition-colors";

  return (
    <section id="contato" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#08080F] to-[#0A0816] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#7C3AED]/8 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="text-[#9B5CF6] text-xs uppercase tracking-[0.2em] mb-4"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            // Fale conosco
          </p>
          <h2
            className="text-[#EEEEF5] mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, fontFamily: "Inter, sans-serif" }}
          >
            Vamos encontrar o gargalo que mais custa tempo na sua operação?
          </h2>
          <p className="text-[#8888A8] max-w-xl mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
            Conte o cenário atual. A partir disso, avaliamos caminhos possíveis e indicamos o melhor próximo passo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-[#7C3AED]/20 bg-[#10101C] p-7">
              <h3
                className="text-[#EEEEF5] mb-5"
                style={{ fontSize: "1.1rem", fontWeight: 600, fontFamily: "Inter, sans-serif" }}
              >
                Fale com a RAOS
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: "E-mail", value: "contato@raostecnologia.com.br" },
                  { icon: Phone, label: "Telefone", value: "+55 (27) 99617-4965" },
                  { icon: MapPin, label: "Localização", value: "Vila Velha, ES - Brasil" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#7C3AED]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={16} className="text-[#9B5CF6]" />
                    </div>
                    <div>
                      <p className="text-[#8888A8] text-xs mb-0.5" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                        {label}
                      </p>
                      <p className="text-[#EEEEF5] text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#7C3AED]/20 bg-[#10101C] p-7">
              <p
                className="text-[#9B5CF6] text-xs mb-2"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                // Atendimento e suporte
              </p>
              <p className="text-[#EEEEF5] text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                Atendimento comercial: segunda a sexta, 08h às 18h
              </p>
              <p className="text-[#8888A8] text-sm mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                Suporte técnico: segunda a sexta, 09h às 19h
              </p>
              <p className="text-[#8888A8] text-sm mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                Planos com monitoramento 24/7 podem ser definidos conforme a criticidade do sistema.
              </p>
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 rounded-2xl border border-[#7C3AED]/20 bg-[#10101C] p-8"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 size={52} className="text-[#7C3AED] mb-4" />
                <h3 className="text-[#EEEEF5] mb-2" style={{ fontSize: "1.3rem", fontWeight: 700, fontFamily: "Inter, sans-serif" }}>
                  Mensagem enviada!
                </h3>
                <p className="text-[#8888A8]" style={{ fontFamily: "Inter, sans-serif" }}>
                  Recebemos seu contato. Vamos analisar o cenário e retornar com o melhor próximo passo.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#8888A8] text-xs mb-1.5 block" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                      Nome *
                    </label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                      className={inputClass}
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>
                  <div>
                    <label className="text-[#8888A8] text-xs mb-1.5 block" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                      E-mail *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      className={inputClass}
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[#8888A8] text-xs mb-1.5 block" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    Empresa
                  </label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Nome da empresa"
                    className={inputClass}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>
                <div>
                  <label className="text-[#8888A8] text-xs mb-1.5 block" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    Serviço de interesse
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={inputClass}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <option value="">Selecione um serviço</option>
                    <option>Software House</option>
                    <option>Consultoria</option>
                    <option>Business Intelligence</option>
                    <option>Suporte</option>
                    <option>Segurança da Informação</option>
                    <option>Automação de Processos</option>
                    <option>Integração de Sistemas</option>
                    <option>IA e Machine Learning</option>
                    <option>Cloud Computing</option>
                    <option>DevOps e CI/CD</option>
                    <option>Manutenção e Evolução</option>
                    <option>Mais de um serviço</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#8888A8] text-xs mb-1.5 block" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    Mensagem *
                  </label>
                  <textarea
                    required
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Conte o problema, o processo atual ou a ideia que você quer tirar do papel..."
                    className={`${inputClass} resize-none`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>
                {error && (
                  <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200" style={{ fontFamily: "Inter, sans-serif" }}>
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#7C3AED] text-white hover:bg-[#9B5CF6] transition-all duration-200 hover:shadow-[0_0_32px_rgba(124,58,237,0.3)] disabled:cursor-not-allowed disabled:opacity-70"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
                >
                  {isSubmitting ? "Enviando..." : "Solicitar diagnóstico"} <Send size={16} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
