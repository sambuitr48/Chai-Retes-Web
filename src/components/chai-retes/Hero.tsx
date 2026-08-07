"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { LogoMark, Wordmark } from "./Logo";

/**
 * Ilustración de marca de fondo, rebotando en los bordes del hero como el
 * logo de DVD. No se puede hacer con un @keyframes de CSS: el punto de
 * rebote depende del tamaño real del contenedor, que cambia con el
 * viewport, así que hace falta JS con requestAnimationFrame llevando
 * posición y velocidad, e invirtiendo el signo al tocar cada borde.
 *
 * El "screen" del rebote es el <div> envolvente (absolute inset-0), no la
 * <section> del Hero directamente — la sección tiene padding (px-4 py-24)
 * y el rebote debe tocar el borde real de la pantalla, no el borde del
 * área con padding.
 *
 * Respeta prefers-reduced-motion: si está activo, la imagen queda fija y
 * centrada en vez de animarse.
 */
function Rays() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let bounds = container.getBoundingClientRect();
    let imgSize = img.getBoundingClientRect();
    let x = (bounds.width - imgSize.width) / 2;
    let y = (bounds.height - imgSize.height) / 2;

    if (prefersReducedMotion) {
      img.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      return;
    }

    const SPEED = 55; // px/seg en cada eje
    let vx = SPEED;
    let vy = SPEED * 0.72; // ángulo no cuadrado, para que no rebote en loop simétrico
    let frameId: number;
    let lastTime = performance.now();

    const handleResize = () => {
      bounds = container.getBoundingClientRect();
      imgSize = img.getBoundingClientRect();
      // Si el viewport se achica, no dejar la imagen fuera del área visible.
      x = Math.min(x, Math.max(0, bounds.width - imgSize.width));
      y = Math.min(y, Math.max(0, bounds.height - imgSize.height));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const tick = (time: number) => {
      // Clamp del delta: si la pestaña estuvo en background, el próximo
      // frame puede traer un dt enorme y hacer que la imagen "teletransporte".
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      x += vx * dt;
      y += vy * dt;

      const maxX = bounds.width - imgSize.width;
      const maxY = bounds.height - imgSize.height;

      if (x <= 0) {
        x = 0;
        vx = Math.abs(vx);
      } else if (x >= maxX) {
        x = maxX;
        vx = -Math.abs(vx);
      }

      if (y <= 0) {
        y = 0;
        vy = Math.abs(vy);
      } else if (y >= maxY) {
        y = maxY;
        vy = -Math.abs(vy);
      }

      img.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <img
        ref={imgRef}
        src="/logo/watermark.png"
        alt=""
        aria-hidden="true"
        className="absolute left-0 top-0 h-[60vh] max-h-[480px] w-[60vh] max-w-[480px] object-contain opacity-[0.14] will-change-transform"
      />
    </div>
  );
}

export function Hero({ id }: { id?: string }) {
  return (
    <section
      id={id}
      className="bg-noise torn-edge-bottom relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-background px-4 py-24 text-center scroll-mt-16"
    >
      <Rays />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <LogoMark className="h-28 w-auto drop-shadow-[0_0_25px_hsl(var(--primary)/0.45)] sm:h-36 md:h-44 lg:h-52" />

        <h1 className="flex items-center justify-center">
          <Wordmark
            className="h-16 w-auto drop-shadow-[0_0_20px_hsl(var(--primary)/0.35)] sm:h-24 md:h-32 lg:h-36"
          />
        </h1>

        <p className="font-display text-base uppercase tracking-[0.35em] text-accent md:text-lg">
          Punk Quindiano y Antifascista
        </p>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <Button asChild size="xl" variant="hero" className="h-14 px-12 text-lg md:h-16 md:px-14 md:text-xl">
            <a href="#musica">Escúchanos</a>
          </Button>
          <Button asChild size="xl" variant="heroOutline" className="h-14 px-12 text-lg md:h-16 md:px-14 md:text-xl">
            <a href="#eventos">Próximos toques</a>
          </Button>
        </div>
      </div>

      <p className="sr-only">
        Chai-Retes, banda de punk desde Armenia, Quindío.
      </p>
    </section>
  );
}