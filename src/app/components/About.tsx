import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { GlobeScene } from "./GlobeScene";

const pillars = [
  "Diagnóstico técnico antes da proposta",
  "Entrega incremental com visibilidade",
  "Arquitetura pensada para crescer",
  "Comunicação direta com quem executa",
  "Segurança e dados desde o início",
  "Evolução contínua depois da entrega",
];

export function About() {
  return (
    <section id="sobre" className="py-28 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* 3D Globe side */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative rounded-2xl overflow-hidden bg-[#10101C] border border-[#7C3AED]/20 flex flex-col items-center">
            <GlobeScene />

            <div className="absolute bottom-6 left-6 right-6 bg-[#10101C]/90 backdrop-blur-sm border border-[#7C3AED]/30 rounded-xl p-4">
              <p
                className="text-[#9B5CF6] text-xs mb-1"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                // missão
              </p>
              <p className="text-[#EEEEF5] text-sm leading-snug" style={{ fontFamily: "Inter, sans-serif" }}>
                "Transformar gargalos operacionais em sistemas, dados e automações que geram controle, escala e eficiência."
              </p>
            </div>
          </div>

          <div className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl border border-[#7C3AED]/30 bg-[#7C3AED]/5 -z-10" />
          <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-[#7C3AED]/8 blur-2xl -z-10" />
        </motion.div>

        {/* Content side */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-[#9B5CF6] text-xs uppercase tracking-[0.2em] mb-4"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            // Quem somos
          </p>
          <h2
            className="text-[#EEEEF5] mb-5"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, fontFamily: "Inter, sans-serif" }}
          >
            Tecnologia com cabeça de negócio, não só código bonito
          </h2>
          <p className="text-[#8888A8] mb-4 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            A RAOS Tecnologia atua onde a operação começa a travar: processos manuais, sistemas que não conversam,
            dados espalhados, falta de visibilidade e produtos digitais que precisam sair do papel com segurança.
          </p>
          <p className="text-[#8888A8] mb-8 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            Nosso trabalho é entender o problema antes de escolher a ferramenta. A partir disso, desenhamos,
            desenvolvemos e sustentamos soluções que reduzem retrabalho, aumentam controle e deixam a empresa pronta
            para crescer com menos improviso.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pillars.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#7C3AED] mt-0.5 shrink-0" />
                <span className="text-[#EEEEF5] text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
