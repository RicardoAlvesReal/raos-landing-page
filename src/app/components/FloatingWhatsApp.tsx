const phoneNumber = "5527996174965";
const displayNumber = "(27) 99617-4965";
const message = encodeURIComponent(
  "Ola! Vim pelo site da RAOS Tecnologia e quero solicitar um diagnostico."
);
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className="relative h-7 w-7 shrink-0"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 3.2C9 3.2 3.3 8.8 3.3 15.7c0 2.3.6 4.4 1.7 6.3l-1.8 6.7 6.9-1.8c1.8 1 3.8 1.5 5.9 1.5 7 0 12.7-5.6 12.7-12.6S23 3.2 16 3.2Z"
        fill="currentColor"
      />
      <path
        d="M22.6 18.9c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.6-.2-.8.2-.2.4-.9 1.2-1.1 1.5-.2.2-.4.3-.8.1-.4-.2-1.5-.5-2.8-1.7-1-1-1.7-2.1-1.9-2.5-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.7.2-.2.2-.4.4-.6.1-.2.1-.5 0-.7-.1-.2-.8-1.9-1.1-2.6-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9 0 1.7 1.2 3.3 1.4 3.5.2.2 2.4 3.8 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 2.2-.9 2.5-1.7.3-.8.3-1.5.2-1.7-.1-.2-.4-.3-.8-.5Z"
        fill="#25D366"
      />
    </svg>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Conversar no WhatsApp pelo numero +55 ${displayNumber}`}
      className="fixed bottom-5 right-5 z-[60] group flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#25D366] text-white shadow-[0_16px_40px_rgba(37,211,102,0.35)] transition-all duration-300 hover:w-[218px] hover:bg-[#20BD5A] hover:shadow-[0_18px_48px_rgba(37,211,102,0.48)] md:bottom-7 md:right-7"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <span className="absolute inset-0 rounded-full border border-white/20" />
      <WhatsAppIcon />
      <span className="relative ml-0 max-w-0 overflow-hidden whitespace-nowrap text-left opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:max-w-[145px] group-hover:opacity-100">
        <span className="block text-xs font-semibold leading-tight">WhatsApp</span>
        <span className="block text-[11px] leading-tight text-white/90">{displayNumber}</span>
      </span>
    </a>
  );
}
