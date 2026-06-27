import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoImg from "../../imports/logomarca_fundo_transparente.png";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Serviços", href: "#servicos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Diferenciais", href: "#diferenciais" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#08080F]/95 backdrop-blur-md border-b border-[#7C3AED]/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="flex h-12 max-w-[168px] items-center overflow-hidden">
          <img src={logoImg} alt="RAOS Tecnologia" className="h-full w-auto object-contain" />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[#8888A8] hover:text-[#9B5CF6] transition-colors duration-200 text-sm tracking-wide"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contato"
            className="px-5 py-2.5 rounded-lg bg-[#7C3AED] text-white text-sm hover:bg-[#9B5CF6] transition-colors duration-200"
          >
            Fale Conosco
          </a>
        </nav>

        <button className="md:hidden text-[#EEEEF5]" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#10101C] border-b border-[#7C3AED]/20 px-6 pb-6">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-[#8888A8] hover:text-[#9B5CF6] transition-colors text-sm border-b border-[#1A1A2E]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="mt-4 block text-center px-5 py-2.5 rounded-lg bg-[#7C3AED] text-white text-sm"
          >
            Fale Conosco
          </a>
        </div>
      )}
    </header>
  );
}
