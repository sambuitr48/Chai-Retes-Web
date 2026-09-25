import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type Photo = { src: string; alt: string; credit?: string };
type Gallery = { id: string; title: string; photos: Photo[] };

const CREDIT_MARTIN = "Martín Barbosa PUNK_.VISUAL";

const GALLERIES: Gallery[] = [
  {
    id: "earthquake",
    title: "Earthquake Tour",
    photos: [
      { src: "/photos/EarthquakeTour.jpeg", alt: "Flyer de EARTHQUAKE TOUR" },
      { src: "/photos/MEJORADOSEARTHQUAKE.jpeg", alt: "EARTHQUAKE - TODOS", credit: CREDIT_MARTIN },
      { src: "/photos/SAMEARTHQUAKE.jpeg", alt: "EARTHQUAKE - SAM", credit: CREDIT_MARTIN },
      { src: "/photos/MILOEARTHQUAKE.jpeg", alt: "EARTHQUAKE - CAMILO", credit: CREDIT_MARTIN },
      { src: "/photos/AJELOEARTHQUAKE.jpeg", alt: "EARTHQUAKE - AJELO", credit: CREDIT_MARTIN },
      { src: "/photos/TINCHOEARTHQUAKE.jpeg", alt: "EARTHQUAKE - TINCHO", credit: CREDIT_MARTIN },
      { src: "/photos/JUANEARTHQUAKE.jpeg", alt: "EARTHQUAKE - JUANCIANO", credit: CREDIT_MARTIN },
      { src: "/photos/AJELOYJUANEARTHQUAKE.jpeg", alt: "EARTHQUAKE - ODISEO Y AGAMENÓN EN EL INFRAMUNDO", credit: CREDIT_MARTIN },
      { src: "/photos/DISCAMILOEARTHQUAKE.jpeg", alt: "EARTHQUAKE - CAMILO", credit: CREDIT_MARTIN },
      { src: "/photos/EBRIOSEARTHQUAKE.jpeg", alt: "EARTHQUAKE - EBRIOS", credit: CREDIT_MARTIN },
      { src: "/photos/EBRIOS2EARTHQUAKE.jpeg", alt: "EARTHQUAKE - JUANCIANO", credit: CREDIT_MARTIN },
      { src: "/photos/AJELOSUDAOEARTHQUAKE.jpeg", alt: "EARTHQUAKE - AJELO", credit: CREDIT_MARTIN },
    ],
  },
  {
    id: "festjuv",
    title: "Festival Juvenil",
    photos: [
      { src: "/photos/FESTJUV.jpeg", alt: "Flyer de FESTJUV" },
      { src: "/photos/festjuvajelo.jpeg", alt: "FESTJUV - Alejo", credit: CREDIT_MARTIN },
      { src: "/photos/festjuvmatisam.jpeg", alt: "Matías y Sam en FESTJUV", credit: CREDIT_MARTIN },
      { src: "/photos/festjuvpalacio.jpeg", alt: "Palacio en FESTJUV", credit: CREDIT_MARTIN },
      { src: "/photos/festjuvpato.jpeg", alt: "Pato en FESTJUV", credit: CREDIT_MARTIN },
      { src: "/photos/festjuvpelolacio.jpeg", alt: "[falta confirmar nombre] en FESTJUV", credit: CREDIT_MARTIN },
      { src: "/photos/festjuvpelolaciopose.jpeg", alt: "[falta confirmar nombre] en FESTJUV", credit: CREDIT_MARTIN },
      { src: "/photos/festjuvsam.jpeg", alt: "Sam en FESTJUV", credit: CREDIT_MARTIN },
      { src: "/photos/festjuvsamalejo.jpeg", alt: "Sam y Alejo en FESTJUV", credit: CREDIT_MARTIN },
      { src: "/photos/festjuvtodosjuntos.jpeg", alt: "La banda completa en FESTJUV", credit: "festivalmusicaljuvenil" },
    ],
  },
  {
    id: "matinee-7",
    title: "Matinée Colectivo 7",
    photos: [
      { src: "/photos/MATINÉE 7.webp", alt: "Flyer de MATINÉE 7" },
      { src: "/photos/alejomatinée.jpeg", alt: "Alejo en MATINÉE 7", credit: CREDIT_MARTIN },
      { src: "/photos/samatinée7.jpeg", alt: "Sam en MATINÉE 7", credit: CREDIT_MARTIN },
      { src: "/photos/palaciomatinée.jpeg", alt: "Palacio en MATINÉE 7", credit: "Sebastian Ocampo" },
      { src: "/photos/matinéeias.jpeg", alt: "Matías en MATINÉE 7", credit: CREDIT_MARTIN },
      { src: "/photos/patinée.jpeg", alt: "Pato en MATINÉE 7", credit: CREDIT_MARTIN },
    ],
  },
];

function PhotoGrid({
  photos,
  onSelect,
}: {
  photos: Photo[];
  onSelect: (photo: Photo) => void;
}) {
  return (
    <div className="mt-6 columns-2 gap-5 sm:columns-3 lg:columns-4">
      {photos.map((photo) => (
        <div key={photo.src} className="mb-5 break-inside-avoid">
          <button
            type="button"
            onClick={() => onSelect(photo)}
            aria-label={`Ampliar foto: ${photo.alt}`}
            className="bg-noise torn-card group relative block w-full overflow-hidden border border-border bg-background transition-transform duration-200 hover:scale-[1.02] hover:border-primary/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" className="block w-full" />
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
  const [active, setActive] = useState<Photo | null>(null);

  return (
    <section
      id={id}
      className="bg-noise torn-edge-bottom relative scroll-mt-24 overflow-hidden bg-card px-4 py-16 md:py-24"
    >
      <div className="container mx-auto">
        <div className="max-w-3xl">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-primary">Galería</p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-none md:text-6xl">Fotos</h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Algunas fotos de nuestros toques.
          </p>
        </div>

        {GALLERIES.map((gallery, i) => (
          <div key={gallery.id}>
            <h3
              className={`${i === 0 ? "mt-12" : "mt-14"} font-display text-2xl uppercase text-foreground`}
            >
              {gallery.title}
            </h3>
            <PhotoGrid photos={gallery.photos} onSelect={setActive} />
          </div>
        ))}

        <Dialog open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
          <DialogContent className="max-w-3xl border-border bg-card p-2">
            {active && (
              <>
                <DialogTitle className="sr-only">{active.alt}</DialogTitle>
                <DialogDescription className="sr-only">{active.alt}</DialogDescription>
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