import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimatedSection } from "./animated-section";

export function HeroSection() {
  return (
    <AnimatedSection showWaves className="relative overflow-hidden bg-gradient-to-b from-dark-blue to-black text-white">
      <div className="absolute right-4 top-4 z-20 flex gap-2">
        <Link href="https://bmgjob.com/#/register/9837494" target="_blank" rel="noopener noreferrer">
          <Button variant="secondary">
            Registro
          </Button>
        </Link>
        <Link href="https://bmgjob.com/#/login" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground">
            Ingreso
          </Button>
        </Link>
      </div>
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
      >
        <div
          className="h-[300px] w-[300px] rounded-full border-[80px] border-primary/10"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="h-[400px] w-[400px] rounded-full border-[100px] border-primary/10"
        />
      </div>
      <div className="container relative mx-auto flex min-h-dvh flex-col items-center justify-center px-4 text-center">
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
    </AnimatedSection>
  );
}
