import { useId } from "react";
import { Guitar, Instagram, Mic2, Music2, Drum } from "lucide-react";

type Member = {
  nick: string;
  role: string;
  quote: string;
  photo?: string;
  instagram?: string;
};

const MEMBERS: Member[] = [
  {
    nick: "Alejandro Fernández",
    role: "Voz principal",
    quote: "El cantonto.",
    photo: "",
    instagram: "https://www.instagram.com/_abejandro_zzz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    nick: "Juan Palacio",
    role: "Guitarra",
    quote: "El guitonto.",
    photo: "",
    instagram: "https://www.instagram.com/plomo.mp3?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    nick: "Samuel Buitrago",
    role: "Guitarra",
    quote: "El otro guitonto.",
    photo: "",
    instagram: "https://www.instagram.com/saam.ratt?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    nick: "Camilo Ballesteros",
    role: "Batería",
    quote: "El batonto.",
    photo: "",
    instagram: "https://www.instagram.com/camilo_ballesteross?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    nick: "Martín Barbosa",
    role: "Bajo",
    quote: "El bajistonto.",
    photo: "",
    instagram: "https://www.instagram.com/martin_.fotografia_2508?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
];

const ROLE_ICONS: Record<string, typeof Music2> = {
  "Voz principal": Mic2,
  Guitarra: Guitar,
  Batería: Drum,
  Bajo: Music2,
};

function getInitials(nick: string) {
  const words = nick.split(" ");
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function MemberCard({ member }: { member: Member }) {
  const Icon = ROLE_ICONS[member.role] ?? Music2;
  const uid = useId();

  return (
    <article className="bg-noise torn-card group w-full border border-border bg-background p-6 text-center transition-colors hover:border-primary/60 sm:w-[calc(50%-0.75rem)] lg:w-[calc(20%-1.2rem)]">
      <div className="relative mx-auto mb-4 h-28 w-28">
        <div className="h-full w-full overflow-hidden rounded-full ring-2 ring-primary/50 ring-offset-2 ring-offset-background transition-transform duration-200 group-hover:scale-105">
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.nick}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="bg-noise flex h-full w-full items-center justify-center bg-secondary">
              <span className="font-display text-2xl text-foreground">
                {getInitials(member.nick)}
              </span>
            </div>
          )}
        </div>
        <span
          key={uid}
          className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground"
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>

      <h3 className="font-display text-xl uppercase leading-none">
        {member.nick}
      </h3>
      <p className="mt-2 text-xs uppercase tracking-wide text-primary">
        {member.role}
      </p>
      <p className="mt-3 text-sm italic text-muted-foreground">
        «{member.quote}»
      </p>

      {member.instagram && (
        <a href={member.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram de ${member.nick}`}
          className="mt-4 inline-flex items-center justify-center rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Instagram className="h-4 w-4" aria-hidden="true" />
        </a>
      )}
    </article>
  );
}

export function Integrantes({ id }: { id?: string }) {
  return (
    <section
      id={id}
      className="bg-noise torn-edge-bottom relative scroll-mt-24 overflow-hidden bg-card px-4 py-16 md:py-24"
    >
      <div className="container mx-auto">
        <div className="max-w-3xl">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-primary">
            La banda
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-none md:text-6xl">
            Integrantes
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {MEMBERS.map((member) => (
            <MemberCard key={member.nick} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}