import logoImg from "../../imports/logomarca_fundo_transparente.png";

export function Footer() {
  return (
    <footer className="border-t border-[#7C3AED]/15 bg-[#08080F] px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="mb-4 flex h-10 max-w-[150px] items-center overflow-hidden">
              <img src={logoImg} alt="RAOS Tecnologia" className="h-full w-auto object-contain" />
            </div>
            <p className="text-[#8888A8] text-sm leading-relaxed max-w-xs" style={{ fontFamily: "Inter, sans-serif" }}>
              Sistemas, automações, dados e IA para empresas que querem operar com mais controle, escala e segurança.
            </p>
          </div>

          <div>
            <p className="text-[#9B5CF6] text-xs uppercase tracking-widest mb-4" style={{ fontFamily: "JetBrains Mono, monospace" }}>
              Serviços
            </p>
            <ul className="space-y-2.5">
              {["Software sob medida", "Automação", "Dados e BI", "IA aplicada", "Cloud e DevOps"].map((s) => (
                <li key={s}>
                  <a href="#servicos" className="text-[#8888A8] text-sm hover:text-[#9B5CF6] transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[#9B5CF6] text-xs uppercase tracking-widest mb-4" style={{ fontFamily: "JetBrains Mono, monospace" }}>
              Empresa
            </p>
            <ul className="space-y-2.5">
              {["Sobre nós", "Diferenciais", "Contato"].map((s) => (
                <li key={s}>
                  <a href="#sobre" className="text-[#8888A8] text-sm hover:text-[#9B5CF6] transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#7C3AED]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#8888A8] text-xs" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            © 2026 RAOS Tecnologia. Todos os direitos reservados.
          </p>
          <p className="text-[#8888A8] text-xs" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            CNPJ: 66.914.167/0001-76
          </p>
        </div>
      </div>
    </footer>
  );
}
