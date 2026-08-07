import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Wordmark } from "./Logo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Historia", href: "#historia" },
  { label: "Escúchanos", href: "#musica" },
  { label: "Fotos", href: "#fotos" },
  { label: "Eventos", href: "#eventos" },
  { label: "Integrantes", href: "#integrantes" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#inicio");

  useEffect(() => {
    const sections = NAV_LINKS
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) {
          setActiveHref(`#${mostVisible.target.id}`);
        }
      },
      {
        // Cuenta como "activa" la sección que cruza la franja central de
        // la pantalla, no la que apenas asoma en el borde de abajo.
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="bg-noise sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <a href="#inicio" aria-label="Chai-Retes, ir al inicio">
          <Wordmark className="h-5 md:h-6" />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <a key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 font-display text-xs uppercase tracking-wider transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full bg-primary transition-opacity duration-200",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                />
              </a>
            );
          })}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            asChild
            aria-label="Abrir menú"
            className={cn("md:hidden")}
          >
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-secondary">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background">
            <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
            <div className="mt-2">
              <Wordmark className="h-6 w-auto" />
            </div>
            <nav className="mt-8 flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeHref === link.href;
                return (
                  <SheetClose asChild key={link.href}>
                    <a href={link.href}
                      className={cn(
                        "rounded-md border-l-2 px-4 py-3 font-display text-xl uppercase tracking-wide transition-colors",
                        isActive
                          ? "border-primary text-primary"
                          : "border-transparent text-foreground hover:border-border hover:bg-secondary"
                      )}
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}