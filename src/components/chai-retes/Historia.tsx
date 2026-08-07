import { Flame } from "lucide-react";

const TIMELINE = [
  { year: "2025", title: "Primer toque", text: "Matinée colectivo 7." },
  { year: "2025", title: "Primer tema propio", text: "«A prueba de balas»." },
  { year: "2026", title: "Composición", text: "Este año nos dedicamos a componer temas propios." },
];

const LINEUP = [
  { name: "Alejandro Fernández", role: "Voz" },
  { name: "Juan Palacio", role: "Guitarra" },
  { name: "Samuel Buitrago", role: "Guitarra" },
  { name: "Martín Barbosa", role: "Bajo" },
  { name: "Camilo Ballesteros", role: "Batería" },
];

export function Historia({ id }: { id?: string }) {
  return (
    <section
      id={id}
      className="bg-noise torn-edge-bottom relative scroll-mt-24 overflow-hidden bg-card px-4 py-16 md:py-24"
    >
      <div className="container mx-auto">
        <div className="max-w-3xl">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-primary">
            De los covers a expresar nuestros ideales
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-none md:text-6xl">
            Historia
          </h2>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[2fr_1fr] md:gap-12">
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              Chai-Retes nació en febrero de 2025, a partir de 5 amigos: Santiago
              Patiño (batería), Juan Palacio (guitarra), Matías (bajo), Alejandro
              Fernández (voz) y Samuel Buitrago (guitarra). Arrancamos con el
              propósito de tocar punk-rock y covers de System Of a Down, Molotov y
              Bersuit Vergarabat: de «Know» de SOAD a «Sr. Cobranza» de la Bersuit.
              A partir de esos covers nos encontramos con nuestro propio estilo —
              agresivo, rápido y político.
            </p>
            <p>
              En mayo de ese mismo año tuvimos nuestro primer toque en el Matinée
              Colectivo #7, donde nos dimos a conocer con nuestro sonido y
              agresividad. Cinco meses después tocamos en el Festival Juvenil,
              donde debutamos 2 temas propios: «A prueba de balas» y «Entropía».
            </p>
            <p>
              Por diferencia de ideas, Santiago (batería) y Matías (bajo)
              salieron de la banda, y entraron Camilo (baterista) y Martín
              (bajista). El cambio de alineación impulsó nuestro objetivo
              principal — punk agresivo y político — enfocándonos en componer
              temas que critiquen la política y la sociedad actual. Contamos con
              más de 5 temas propios a la fecha de hoy.
            </p>
          </div>

          <aside className="space-y-6 md:self-start">
            <div className="rounded-lg border border-border bg-background p-6">
              <p className="font-display text-xs uppercase tracking-[0.25em] text-primary">
                Alineación actual
              </p>
              <ul className="mt-4 space-y-3">
                {LINEUP.map((member) => (
                  <li
                    key={member.name}
                    className="flex items-baseline justify-between gap-3 text-sm"
                  >
                    <span className="text-foreground">{member.name}</span>
                    <span className="text-muted-foreground">{member.role}</span>
                  </li>
                ))}
              </ul>
            </div>

            <blockquote className="border-l-2 border-primary bg-background p-5 font-medium text-foreground">
              Queremos implementar una nueva propuesta del Punk Quindiano.
            </blockquote>
          </aside>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {TIMELINE.map((item, i) => (
            <li
              key={item.year}
              className="bg-noise relative rounded-lg border border-border bg-background p-6"
            >
              <div className="flex items-center gap-3">
                <span className="font-display text-3xl text-primary">
                  {item.year}
                </span>
                {i < TIMELINE.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="ml-auto hidden h-px w-12 bg-border md:block"
                  />
                )}
              </div>
              <h3 className="mt-4 font-display text-xl uppercase">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
              <Flame className="mt-4 h-5 w-5 text-primary/70" aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}