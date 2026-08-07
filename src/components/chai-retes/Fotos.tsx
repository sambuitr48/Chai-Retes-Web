import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type Photo = { src: string; alt: string; credit?: string };

const FESTJUV_PHOTOS: Photo[] = [
  { src: "/photos/FESTJUV.jpeg", alt: "Flyer de FESTJUV", credit: "" },
  { src: "/photos/festjuvajelo.jpeg", alt: "FESTJUV - Alejo", credit: "Martín Barbosa PUNK_.VISUAL" },
  { src: "/photos/festjuvmatisam.jpeg", alt: "Matías y Sam en FESTJUV", credit: "Martín Barbosa PUNK_.VISUAL" },
  { src: "/photos/festjuvpalacio.jpeg", alt: "Palacio en FESTJUV", credit: "Martín Barbosa PUNK_.VISUAL" },
  { src: "/photos/festjuvpato.jpeg", alt: "Pato en FESTJUV", credit: "Martín Barbosa PUNK_.VISUAL" },
  { src: "/photos/festjuvpelolacio.jpeg", alt: "[falta confirmar nombre] en FESTJUV", credit: "Martín Barbosa PUNK_.VISUAL" },
  { src: "/photos/festjuvpelolaciopose.jpeg", alt: "[falta confirmar nombre] en FESTJUV", credit: "Martín Barbosa PUNK_.VISUAL" },
  { src: "/photos/festjuvsam.jpeg", alt: "Sam en FESTJUV", credit: "Martín Barbosa PUNK_.VISUALPunk" },
  { src: "/photos/festjuvsamalejo.jpeg", alt: "Sam y Alejo en FESTJUV", credit: "Martín Barbosa PUNK_.VISUAL" },
  { src: "/photos/festjuvtodosjuntos.jpeg", alt: "La banda completa en FESTJUV", credit: "festivalmusicaljuvenil" },
];

const MATINEE_PHOTOS: Photo[] = [
  { src: "/photos/MATINÉE 7.webp", alt: "Flyer de MATINÉE 7", credit: "" },
  { src: "/photos/alejomatinée.jpeg", alt: "Alejo en MATINÉE 7", credit: "Martín Barbosa PUNK_.VISUAL" },
  { src: "/photos/samatinée7.jpeg", alt: "Sam en MATINÉE 7", credit: "Martín Barbosa PUNK_.VISUAL" },
  { src: "/photos/palaciomatinée.jpeg", alt: "Palacio en MATINÉE 7", credit: "Sebastian Ocampo" },
  { src: "/photos/matinéeias.jpeg", alt: "Matías en MATINÉE 7", credit: "Martín Barbosa PUNK_.VISUAL" },
  { src: "/photos/patinée.jpeg", alt: "Pato en MATINÉE 7", credit: "Martín Barbosa PUNK_.VISUAL" },
];

// El modal necesita una lista plana para poder abrir cualquier foto por índice,
// sin importar de qué grilla vino.
const PHOTOS: Photo[] = [...FESTJUV_PHOTOS, ...MATINEE_PHOTOS];

function PhotoGrid({
  photos,
  offset,
  onSelect,
}: {
  photos: Photo[];
  offset: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="mt-6 columns-2 gap-5 sm:columns-3 lg:columns-4">
      {photos.map((photo, i) => (
        <div key={photo.src} className="mb-5 break-inside-avoid">
          <button
            type="button"
            onClick={() => onSelect(offset + i)}
            aria-label={`Ampliar foto: ${photo.alt}`}
            className="bg-noise torn-card group relative block w-full overflow-hidden border border-border bg-background transition-transform duration-200 hover:scale-[1.02] hover:border-primary/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="block w-full"
            />
            {photo.credit && (
              <span className="absolute bottom-0 left-0 right-0 translate-y-full bg-black/70 px-2 py-1 text-left text-[10px] uppercase tracking-wide text-white/90 transition-transform duration-200 group-hover:translate-y-0">
                Foto: {photo.credit}
              </span>
            )}
          </button>
        </div>
      ))}
    </div>
  );
}

export function Fotos({ id }: { id?: string }) {
  const [selected, setSelected] = useState<number | null>(null);
  const active = selected === null ? null : PHOTOS[selected];

  return (
    <section
      id={id}
      className="bg-noise torn-edge-bottom relative scroll-mt-24 overflow-hidden bg-card px-4 py-16 md:py-24"
    >
      <div className="container mx-auto">
        <div className="max-w-3xl">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-primary">
            Galería
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-none md:text-6xl">
            Fotos
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Algunas fotos de nuestros toques.
          </p>
        </div>

        <h3 className="mt-12 font-display text-2xl uppercase text-foreground">
          Festival Juvenil
        </h3>
        <PhotoGrid photos={FESTJUV_PHOTOS} offset={0} onSelect={setSelected} />

        <h3 className="mt-14 font-display text-2xl uppercase text-foreground">
          Matinée Colectivo 7
        </h3>
        <PhotoGrid
          photos={MATINEE_PHOTOS}
          offset={FESTJUV_PHOTOS.length}
          onSelect={setSelected}
        />

        <Dialog
          open={selected !== null}
          onOpenChange={(o) => !o && setSelected(null)}
        >
          <DialogContent className="max-w-3xl border-border bg-card p-2">
            {active && (
              <>
                <DialogTitle className="sr-only">{active.alt}</DialogTitle>
                <DialogDescription className="sr-only">
                  {active.alt}
                </DialogDescription>
                <img
                  src={active.src}
                  alt={active.alt}
                  className="max-h-[80vh] w-full object-contain"
                />
                {active.credit && (
                  <p className="px-2 pt-2 text-right text-xs uppercase tracking-wide text-muted-foreground">
                    Foto: {active.credit}
                  </p>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}