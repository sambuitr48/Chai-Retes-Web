import { Navbar } from "@/components/chai-retes/Navbar";
import { Hero } from "@/components/chai-retes/Hero";
import { Historia } from "@/components/chai-retes/Historia";
import { Musica } from "@/components/chai-retes/Musica";
import { Fotos } from "@/components/chai-retes/Fotos";
import { Eventos } from "@/components/chai-retes/Eventos";
import { Integrantes } from "@/components/chai-retes/Integrantes";
import { Contacto } from "@/components/chai-retes/Contacto";
import { Footer } from "@/components/chai-retes/Footer";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <main>
        <Hero id="inicio" />
        <Historia id="historia" />
        <Musica id="musica" />
        <Fotos id="fotos" />
        <Eventos id="eventos" />
        <Integrantes id="integrantes" />
        <Contacto id="contacto" />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
