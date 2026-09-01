import { useState } from "react";
import { MapPin, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const MONTHS_ES = [
  "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
  "JUL", "AGO", "SEP", "OCT", "NOV", "DIC",
];

type EventItem = {
  /** Formato ISO "YYYY-MM-DD" — de acá se derivan día/mes/año, no lo dupliques a mano. */
  date: string;
  city: string;
  venue: string;
  time: string;
  flyer?: string;
};

const EVENTS: EventItem[] = [
  
  {
    date: "2025-05-17",
    city: "Armenia",
    venue: "Century",
    time: "6:00 PM",
    flyer: "/photos/MATINÉE 7.webp",
  },

  {
    date: "2025-10-04",
    city: "Armenia",
    venue: "Bar Zona Urbana",
    time: "9:30 PM",
    flyer: "/photos/FESTJUV.jpeg",
  },
  
  {
    date: "2026-08-15",
    city: "Armenia (Cancelado)",
    venue: "Century",
    time: "9:00 PM",
    flyer: "/photos/porsinosvolvemosaver.jpeg",
  },

  {
    date: "2026-09-12",
    city: "Armenia",
    venue: "Century",
    time: "8:00 PM",
    flyer: "/photos/EarthquakeTour.jpeg",
  },

];

function parseEventDate(iso: string) {
  return new Date(`${iso}T00:00:00`);
}

function formatBadge(iso: string) {
  const d = parseEventDate(iso);
  return {
    day: d.getDate().toString().padStart(2, "0"),
    month: MONTHS_ES[d.getMonth()],
    year: d.getFullYear(),
  };
}

function EventCard({
  event,
  isPast,
  onOpenFlyer,
}: {
  event: EventItem;
  isPast: boolean;
  onOpenFlyer: () => void;
}) {
  const { day, month, year } = formatBadge(event.date);

  return (
    <article
      className={cn(
        "bg-noise flex items-stretch gap-4 rounded-lg border border-border bg-card p-5",
        isPast && "opacity-70"
      )}
    >
      <div
        className={cn(
          "flex w-20 shrink-0 flex-col items-center justify-center rounded-md px-2 py-3 text-center",
          isPast
            ? "bg-secondary text-muted-foreground"
            : "bg-primary text-primary-foreground"
        )}
      >
        <span className="font-display text-3xl leading-none">{day}</span>
        <span className="mt-1 text-[10px] uppercase tracking-wide">
          {month} {year}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="font-display text-2xl uppercase leading-none">
          {event.city}
        </h3>
        <div className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
            {event.venue}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
            {event.time}
          </span>
        </div>
      </div>

      {event.flyer ? (
        <button
          type="button"
          onClick={onOpenFlyer}
          aria-label={`Ver flyer de ${event.city}, ${event.venue}`}
          className={cn(
            "block w-20 shrink-0 self-stretch overflow-hidden rounded-md border border-border transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            isPast && "grayscale"
          )}
        >
          <img
            src={event.flyer}
            alt={`Flyer: ${event.city}, ${event.venue}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </button>
      ) : (
        <div className="flex w-20 shrink-0 items-center justify-center self-stretch rounded-md border border-dashed border-border text-center text-[9px] uppercase tracking-wide text-muted-foreground">
          Flyer pendiente
        </div>
      )}
    </article>
  );
}

export function Eventos({ id }: { id?: string }) {
  const [openFlyer, setOpenFlyer] = useState<string | null>(null);
  const now = new Date();

  const upcoming = EVENTS.filter((e) => parseEventDate(e.date) >= now).sort(
    (a, b) => parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime()
  );
  const past = EVENTS.filter((e) => parseEventDate(e.date) < now).sort(
    (a, b) => parseEventDate(b.date).getTime() - parseEventDate(a.date).getTime()
  );

  return (
    <section
      id={id}
      className="bg-noise torn-edge-bottom relative scroll-mt-24 overflow-hidden bg-background px-4 py-16 md:py-24"
    >
      <div className="container mx-auto">
        <div className="max-w-3xl">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-primary">
            Eventos
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-none md:text-6xl">
            Toques
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Conoce nuestros toques.
          </p>
        </div>

        <h3 className="mt-12 font-display text-2xl uppercase text-foreground">
          Próximos toques
        </h3>
        {upcoming.length > 0 ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {upcoming.map((event) => (
              <EventCard
                key={event.date}
                event={event}
                isPast={false}
                onOpenFlyer={() => setOpenFlyer(event.flyer ?? null)}
              />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-muted-foreground">
            Todavía no hay toques agendados.
          </p>
        )}

        <h3 className="mt-14 font-display text-2xl uppercase text-foreground">
          Toques pasados
        </h3>
        {past.length > 0 ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {past.map((event) => (
              <EventCard
                key={event.date}
                event={event}
                isPast={true}
                onOpenFlyer={() => setOpenFlyer(event.flyer ?? null)}
              />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-muted-foreground">
            Todavía no tenemos toques pasados registrados.
          </p>
        )}

        <Dialog open={openFlyer !== null} onOpenChange={(o) => !o && setOpenFlyer(null)}>
          <DialogContent className="max-w-xl border-border bg-card p-2">
            <DialogTitle className="sr-only">Flyer del toque</DialogTitle>
            <DialogDescription className="sr-only">
              Vista ampliada del flyer del toque
            </DialogDescription>
            {openFlyer && (
              <img src={openFlyer} alt="Flyer del toque" className="w-full object-contain" />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}