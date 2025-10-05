import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative w-full bg-gradient-to-b from-dark-blue to-black text-white">
      <div className="container mx-auto flex min-h-dvh flex-col items-center justify-center px-4 text-center">
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
