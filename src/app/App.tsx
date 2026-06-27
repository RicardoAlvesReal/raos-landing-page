import "../styles/fonts.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { Differentials } from "./components/Differentials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";

export default function App() {
  return (
    <div className="min-h-screen bg-[#08080F]" style={{ fontFamily: "Inter, sans-serif" }}>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Differentials />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
