import { motion } from "motion/react";
import { GraduationCap, ArrowUpRight } from "lucide-react";

interface Company {
  id: string;
  name: string;
  category: string;
  description: string;
  logo?: string;
  icon?: typeof GraduationCap;
  accentColor: string;
  link?: string;
  metrics?: string;
}

const companies: Company[] = [
  {
    id: "docaos",
    name: "DocaOS",
    category: "Logística Portuária & Docas (YMS)",
    description: "Gestão inteligente de pátios, agendamento de slots e controle de portaria.",
    logo: "/logos/docaos.png",
    accentColor: "#00A896",
    link: "https://docaos.log.br",
    metrics: "YMS em Produção",
  },
  {
    id: "cardanos",
    name: "CardanOS",
    category: "Gestão para Oficinas Mecânicas",
    description: "Controle de ordens de serviço, estoque, fluxo financeiro e operação mecânica.",
    logo: "/logos/cardanos.png",
    accentColor: "#3B82F6",
    metrics: "ERP Automotivo",
  },
  {
    id: "bjjrats",
    name: "BJJRats",
    category: "Plataforma SaaS para Academias",
    description: "Gestão completa de academias de Jiu-Jitsu, alunos, graduações e pagamentos.",
    logo: "/logos/bjjrats.png",
    accentColor: "#E11D48",
    metrics: "SaaS Ativo",
  },
  {
    id: "vokalix",
    name: "Vokalix",
    category: "Automação & Karaokê Inteligente",
    description: "Experiência interativa em tempo real via QR Code para bares e casas de show.",
    logo: "/logos/vokalix.png",
    accentColor: "#A855F7",
    metrics: "Realtime WebSockets",
  },
  {
    id: "gredu",
    name: "GR Educação",
    category: "Plataforma Educacional & EAD",
    description: "Ambiente virtual de aprendizagem, avaliações e gestão de cursos supletivos.",
    icon: GraduationCap,
    accentColor: "#10B981",
    metrics: "EAD & Certificação",
  },
];

export function CompaniesCarousel() {
  // Duplicamos a lista para criar um loop infinito contínuo e sem interrupções
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <section className="relative py-16 overflow-hidden border-y border-[#7C3AED]/15 bg-[#0A0A14]/70">
      {/* Background glow sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full bg-[#7C3AED]/5 blur-[100px] pointer-events-none" />

      {/* Header da seção */}
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 mb-3"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#9B5CF6]" />
          <span
            className="text-[#9B5CF6] text-[11px] tracking-widest uppercase"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            // Empresas & Soluções em Operação
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[#EEEEF5] text-xl sm:text-2xl font-bold tracking-tight"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Tecnologia construída para empresas que precisam de controle e escala
        </motion.h2>
        <p
          className="text-[#8888A8] text-xs sm:text-sm mt-2 max-w-2xl mx-auto"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Sistemas proprietários, plataformas SaaS e automações sob medida desenvolvidas pela RAOS.
        </p>
      </div>

      {/* Container do Marquee com gradientes de fade nas extremidades */}
      <div className="relative w-full overflow-hidden">
        {/* Gradients laterais para suavizar entrada e saída */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-[#08080F] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-[#08080F] to-transparent z-10" />

        {/* Trilho animado contínuo */}
        <div className="animate-marquee gap-6 py-2 px-3">
          {duplicatedCompanies.map((company, index) => {
            const Icon = company.icon;
            const CardWrapper = company.link ? "a" : "div";
            const wrapperProps = company.link
              ? {
                  href: company.link,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : {};

            return (
              <CardWrapper
                key={`${company.id}-${index}`}
                {...wrapperProps}
                className="group relative flex flex-col justify-between w-[320px] sm:w-[350px] shrink-0 p-5 rounded-2xl bg-[#10101C]/80 border border-[#7C3AED]/20 hover:border-[#7C3AED]/60 transition-all duration-300 hover:shadow-[0_0_24px_rgba(124,58,237,0.18)] hover:-translate-y-1 select-none cursor-pointer"
              >
                {/* Linha superior: Logo + Categoria */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="h-10 flex items-center max-w-[170px]">
                      {company.logo ? (
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="max-h-9 w-auto object-contain filter group-hover:brightness-110 transition-all duration-200"
                          loading="lazy"
                        />
                      ) : Icon ? (
                        <div className="flex items-center gap-2 text-[#EEEEF5] font-semibold tracking-wide">
                          <div className="w-8 h-8 rounded-lg bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
                            <Icon size={18} />
                          </div>
                          <span className="text-base text-[#EEEEF5]">{company.name}</span>
                        </div>
                      ) : (
                        <span className="text-base font-bold text-[#EEEEF5]">{company.name}</span>
                      )}
                    </div>

                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase bg-[#18182C] border border-[#7C3AED]/30 text-[#9B5CF6] shrink-0 font-medium"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {company.metrics}
                    </span>
                  </div>

                  {/* Informações da empresa */}
                  <h3
                    className="text-[#EEEEF5] text-sm font-semibold mb-1 group-hover:text-white transition-colors"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {company.name}
                  </h3>

                  <p
                    className="text-[#9B5CF6] text-xs mb-2 font-medium"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {company.category}
                  </p>

                  <p
                    className="text-[#8888A8] text-xs leading-relaxed line-clamp-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {company.description}
                  </p>
                </div>

                {/* Rodapé do card */}
                <div className="mt-4 pt-3 border-t border-[#7C3AED]/10 flex items-center justify-between text-[11px] text-[#8888A8] group-hover:text-[#9B5CF6] transition-colors">
                  <span style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    {company.link ? "Acessar plataforma" : "Solução desenvolvida"}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                  />
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}

