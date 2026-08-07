import { Copy, Instagram, Mail, Music2, Youtube, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type Social = { label: string; icon: LucideIcon; href: string };

const SOCIALS: Social[] = [
  {
    label: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/chai_retes_punk?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    label: "YouTube",
    icon: Youtube,
    href: "https://youtube.com/@chai-retes?si=YWl2BDjkqegA2tnt",
  },
];

const BOOKING_EMAIL = "chairetes1103@gmail.com";

export function Contacto({ id }: { id?: string }) {
  const { toast } = useToast();

  function handleCopyEmail() {
    navigator.clipboard.writeText(BOOKING_EMAIL);
    toast({
      title: "Correo copiado",
      description: BOOKING_EMAIL,
    });
  }

  return (
    <section
      id={id}
      className="bg-noise torn-edge-bottom relative scroll-mt-24 overflow-hidden bg-background px-4 py-16 md:py-24"
    >
      <div className="container mx-auto max-w-2xl text-center">
        <p className="font-display text-sm uppercase tracking-[0.3em] text-primary">
          Redes
        </p>
        <h2 className="mt-3 font-display text-4xl uppercase leading-none md:text-6xl">
          Contacto
        </h2>
        <p className="mt-4 text-base text-muted-foreground md:text-lg">
          Síguenos en nuestras redes sociales.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {SOCIALS.map((social) => {
            const Icon = social.icon;
            return (
              <a key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {social.label}
              </a>
            );
          })}
        </div>

        <div className="bg-noise mt-10 rounded-lg border border-border bg-card p-6">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            E-MAIL
          </p>
          <p className="mt-1 break-all font-display text-2xl text-foreground">
            {BOOKING_EMAIL}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Button asChild variant="hero" size="lg">
              <a href={`mailto:${BOOKING_EMAIL}`}>
                <Mail aria-hidden="true" />
                Escribir por correo
              </a>
            </Button>
            <Button variant="outline" size="lg" onClick={handleCopyEmail}>
              <Copy aria-hidden="true" />
              Copiar correo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}