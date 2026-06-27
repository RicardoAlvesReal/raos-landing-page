import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { HeroScene } from "./HeroScene";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#7C3AED 1px, transparent 1px), linear-gradient(90deg, #7C3AED 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* 3D Scene - full background */}
      <HeroScene />

      {/* Glow blobs behind text */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#7C3AED]/10 blur-[120px] pointer-events-none" style={{ zIndex: 2 }} />

      {/* Content sits above the 3D canvas */}
      <div className="relative text-center max-w-5xl mx-auto" style={{ zIndex: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/10 mb-8 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#9B5CF6] animate-pulse" />
          <span className="text-[#9B5CF6] text-xs tracking-widest uppercase" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            Software, automação, dados e IA para operação real
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[#EEEEF5] leading-[1.1] tracking-tight mb-6"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 800, fontFamily: "Inter, sans-serif" }}
        >
          Software que{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #9B5CF6 0%, #7C3AED 50%, #5B21B6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            resolve gargalos
          </span>{" "}
          e acelera sua operação
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[#8888A8] max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ fontSize: "1.125rem", fontFamily: "Inter, sans-serif" }}
        >
          Desenvolvemos sistemas, integrações, automações, dashboards e IA para empresas que precisam ganhar controle,
          reduzir retrabalho e escalar com segurança. Tecnologia com estratégia, entrega e sustentação.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#contato"
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#7C3AED] text-white hover:bg-[#9B5CF6] transition-all duration-200 hover:shadow-[0_0_32px_rgba(124,58,237,0.4)]"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
          >
            Falar com especialista <ArrowRight size={18} />
          </a>
          <a
            href="#servicos"
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl border border-[#7C3AED]/40 text-[#EEEEF5] hover:border-[#9B5CF6] hover:text-[#9B5CF6] transition-all duration-200 backdrop-blur-sm"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
          >
            Ver soluções
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex items-center justify-center gap-12 mt-20 pt-10 border-t border-[#7C3AED]/10"
        >
          {[
            { value: "Diagnóstico", label: "antes de desenvolver" },
            { value: "Sob medida", label: "para sua operação" },
            { value: "Dados", label: "para decidir melhor" },
            { value: "Suporte", label: "para manter evoluindo" },
          ].map((stat) => (
            <div key={stat.label} className="text-center hidden sm:block">
              <p
                className="text-[#9B5CF6]"
                style={{ fontSize: "1.75rem", fontWeight: 700, fontFamily: "Inter, sans-serif" }}
              >
                {stat.value}
              </p>
              <p className="text-[#8888A8] text-sm mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <a
        href="#servicos"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#8888A8] hover:text-[#9B5CF6] transition-colors animate-bounce"
        style={{ zIndex: 3 }}
      >
        <ChevronDown size={24} />
      </a>
    </section>
  );
}
