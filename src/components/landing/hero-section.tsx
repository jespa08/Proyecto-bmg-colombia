import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative w-full bg-gradient-to-b from-dark-blue to-black text-white">
      <div className="container mx-auto flex min-h-dvh flex-col items-center justify-center px-4 text-center">
        <Image 
          src="https://storage.googleapis.com/project-spark-308622-users-code/user-2d2d3c90-e5a9-4598-a83a-438902d184cf/src/assets/logo-bmg-colombia-small.png" 
          alt="BMG Logo" 
          width={200} 
          height={200} 
          className="mb-6"
        />
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
