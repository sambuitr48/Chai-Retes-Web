import { useEffect, useRef, useState } from "react";
import { Music2, Pause, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Track = {
  platform: string;
  title: string;
  embedUrl?: string;
  audioUrl?: string;
};

type Song = {
  title: string;
  tag: "Propia" | "Punk Cover";
  audioUrl?: string;
};

const DEMOS: Song[] = [
  {
    title: "Chite de acá",
    tag: "Propia",
    audioUrl: "/audio/Chite de Acá (Chai-Retes).m4a",
  },
  {
    title: "A prueba de balas",
    tag: "Propia",
    audioUrl: "/audio/A Prueba de Balas (Chai-Retes).m4a",
  },
  {
    title: "Se creen gringos",
    tag: "Propia",
    audioUrl: "/audio/Se Creen Gringos (Chai-Retes).m4a",
  },
  {
    title: "El pobre",
    tag: "Punk Cover",
    audioUrl: "/audio/El Pobre (Punk Cover).m4a",
  },
  {
    title: "Empanada",
    tag: "Propia",
    audioUrl: "/audio/Empanada (Chai-Retes).m4a",
  },
];

const TRACKS: Track[] = [
  { platform: "Hola", title: "Toques" },
  { platform: "Hola", title: "Ensayos" },
];

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

function AudioPlayer({ src, title }: { src: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration);
    const onEnd = () => setIsPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const value = Number(e.target.value);
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex w-full items-center gap-4">
      <audio ref={audioRef} src={src} preload="none" className="hidden" />

      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? `Pausar ${title}` : `Reproducir ${title}`}
        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95"
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Play className="ml-0.5 h-4 w-4" aria-hidden="true" />
        )}
      </button>

      <div className="flex-1">
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={seek}
          aria-label={`Progreso de ${title}`}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full accent-primary"
          style={{
            background: `linear-gradient(to right, hsl(var(--primary)) ${progress}%, hsl(var(--border)) ${progress}%)`,
          }}
        />
        <div className="mt-1.5 flex justify-between font-mono text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}

function SongCard({ song }: { song: Song }) {
  return (
    <Card className="bg-noise border-border bg-card">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg uppercase leading-tight">
            {song.title}
          </h3>
          <span
            className={cn(
              "flex-shrink-0 rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-wide",
              song.tag === "Propia"
                ? "border-primary/50 text-primary"
                : "border-border text-muted-foreground"
            )}
          >
            {song.tag}
          </span>
        </div>

        <div className="mt-4">
          {song.audioUrl ? (
            <AudioPlayer src={song.audioUrl} title={song.title} />
          ) : (
            <div className="flex items-center gap-3 rounded-md border border-dashed border-border bg-secondary/50 px-4 py-3.5">
              <Music2
                className="h-4 w-4 flex-shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <p className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Audio pendiente
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function Embed({ track }: { track: Track }) {
  if (track.embedUrl) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-md">
        <iframe
          src={track.embedUrl}
          title={`${track.title} — ${track.platform}`}
          loading="lazy"
          className="h-full w-full border-0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-noise flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed border-primary/40 bg-secondary"
      )}
    >
      <Music2 className="h-10 w-10 text-primary/70" aria-hidden="true" />
      <p className="font-display text-sm uppercase tracking-[0.25em] text-muted-foreground">
        Próximamente
      </p>
    </div>
  );
}

export function Musica({ id }: { id?: string }) {
  return (
    <section
      id={id}
      className="bg-noise torn-edge-bottom relative scroll-mt-24 overflow-hidden bg-background px-4 py-16 md:py-24"
    >
      <div className="container mx-auto">
        <div className="max-w-3xl">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-primary">
            Ruido
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-none md:text-6xl">
            Escúchanos
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Nuestra galería de ruido.
          </p>
        </div>

        <h3 className="mt-12 font-display text-2xl uppercase text-foreground">
          Demos
        </h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DEMOS.map((song) => (
            <SongCard key={song.title} song={song} />
          ))}
        </div>

        {/*
        <h3 className="mt-14 font-display text-2xl uppercase text-foreground">
          Más grabaciones
        </h3>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {TRACKS.map((track) => (
            <Card key={track.title} className="border-border bg-card">
              <CardContent className="p-4">
                <Embed track={track} />
                <div className="mt-4 flex items-center justify-between">
                  <h3 className="font-display text-lg uppercase">
                    {track.title}
                  </h3>
                  <span className="rounded-full border border-border px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {track.platform}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        */}
      </div>
    </section>
  );
}