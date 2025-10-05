import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Waves } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full bg-gradient-to-b from-dark-blue to-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
        <div
          className="absolute top-0 left-0 w-[200%] h-full flex"
          style={{
            animation: "wave-scroll 20s linear infinite",
          }}
        >
          <div
            className="w-1/2 h-full bg-contain bg-no-repeat bg-left-top"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 50% 80% at 30% 50%, hsl(var(--primary) / 0.2), transparent)",
            }}
          ></div>
          <div
            className="w-1/2 h-full bg-contain bg-no-repeat bg-right-bottom"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 50% 80% at 70% 50%, hsl(var(--primary) / 0.2), transparent)",
            }}
          ></div>
        </div>
        <div
          className="absolute top-0 left-0 w-[200%] h-full flex"
          style={{
            animation: "wave-scroll 25s linear infinite reverse",
          }}
        >
          <div
            className="w-1/2 h-full bg-contain bg-no-repeat bg-center-top"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 60% 70% at 20% 60%, hsl(var(--accent) / 0.15), transparent)",
            }}
          ></div>
          <div
            className="w-1/2 h-full bg-contain bg-no-repeat bg-center-bottom"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 60% 70% at 80% 40%, hsl(var(--accent) / 0.15), transparent)",
            }}
          ></div>
        </div>
      </div>
      <div className="relative z-10 container mx-auto flex min-h-dvh flex-col items-center justify-center px-4 text-center">
        <h1 className="font-headline text-5xl font-bold tracking-tighter text-white md:text-6xl">
          BMG<span className="text-primary">.</span>
        </h1>
        <h2 className="mt-6 font-headline max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          Impulsando la música global. Creando oportunidades reales.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-neutral-300 md:text-xl">
          Proyecto BMG Colombia — Innovación, música y empleo digital al servicio de nuevos talentos.
        </p>
        <Link href="#about" className="mt-8">
          <Button size="lg" variant="outline" className="border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground">
            Conoce cómo participar
          </Button>
        </Link>
      </div>
    </section>
  );
}
