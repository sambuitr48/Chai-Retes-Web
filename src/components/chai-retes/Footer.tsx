import { Instagram, Music2, Youtube, type LucideIcon } from "lucide-react";
import { LogoMark, Wordmark } from "./Logo";

const SOCIALS: { label: string; icon: LucideIcon; href: string }[] = [
  { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/chai_retes_punk?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { label: "YouTube", icon: Youtube, href: "https://youtube.com/@chai-retes?si=YWl2BDjkqegA2tnt" },
];

const QUICK_LINKS = [
  { label: "Historia", href: "#historia" },
  { label: "Escúchanos", href: "#musica" },
  { label: "Fotos", href: "#fotos" },
  { label: "Eventos", href: "#eventos" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-noise relative bg-background px-4 pb-10 pt-14">
      <div className="absolute inset-x-0 top-0 h-1 bg-primary" aria-hidden="true" />

      <div className="container mx-auto">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
            <span className="flex items-center gap-3">
              <LogoMark className="h-10 w-auto drop-shadow-[0_0_15px_hsl(var(--primary)/0.35)]" />
              <Wordmark className="h-7 w-auto" />
            </span>
            <span className="h-px w-16 bg-primary/50" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">Punk Cuyabro.</p>
          </div>

          <nav className="flex flex-col items-center gap-3 md:items-start">
            <p className="font-display text-sm uppercase tracking-[0.3em] text-primary">
              <span className="mr-2 text-foreground/40">//</span>
              Secciones
            </p>
            <div className="flex flex-col items-center gap-2 md:items-start">
              {QUICK_LINKS.map((link) => (
                <a key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="flex flex-col items-center gap-3 md:items-start">
            <p className="font-display text-sm uppercase tracking-[0.3em] text-primary">
              <span className="mr-2 text-foreground/40">//</span>
              Redes
            </p>
            <div className="flex gap-3">
              {SOCIALS.map((social) => {
                const Icon = social.icon;
                return (
                  <a key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative mt-12 pt-6">
          <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
            aria-hidden="true"
          />
          <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p>© {year} Chai-Retes.</p>
            <p>Punk Antifacho.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}