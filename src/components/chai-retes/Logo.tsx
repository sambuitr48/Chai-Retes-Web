import { cn } from "@/lib/utils";

/**
 * Logo Chai-Retes.
 *
 * Ícono y wordmark son las imágenes de marca reales, provistas como PNG con
 * fondo transparente (versión "fondos oscuros" / "invertido", en blanco) y
 * guardadas en /public/logo/. Se renderizan como dos <img> independientes
 * (nunca combinados en una sola pieza) y solo se les fija el alto: el ancho
 * queda en "auto" para respetar la proporción original de cada archivo.
 */

export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/logo/icon.png"
      alt=""
      className={cn("h-8 w-auto object-contain", className)}
    />
  );
}

export function Wordmark({
  className,
  alt = "Chai-Retes",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src="/logo/wordmark.png"
      alt={alt}
      className={cn("h-5 w-auto object-contain", className)}
    />
  );
}

/** Emblema + wordmark, cada uno como imagen independiente (para navbar / footer). */
export function Logo({
  className,
  iconClassName,
  wordmarkClassName,
}: {
  className?: string;
  iconClassName?: string;
  wordmarkClassName?: string;
}) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LogoMark className={cn("h-8 w-auto shrink-0", iconClassName)} />
      <Wordmark className={cn("h-5 md:h-6", wordmarkClassName)} />
    </span>
  );
}
