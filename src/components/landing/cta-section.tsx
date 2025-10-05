import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CtaSection() {
  return (
    <section id="register" className="w-full bg-primary py-16 md:py-24 lg:py-32">
      <div className="container mx-auto flex flex-col items-center gap-4 px-4 text-center md:px-6">
        <h2 className="font-headline text-3xl font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl">
          Únete al movimiento musical global con BMG.
        </h2>
        <p className="max-w-2xl text-primary-foreground/90 md:text-xl/relaxed">
          Puedes probar como pasante por 3 días y conocer cómo funciona la plataforma.
        </p>
        <Link href="https://bmgjob.com/#/register/9837494" target="_blank" rel="noopener noreferrer">
          <Button
            size="lg"
            className="mt-4 rounded-full bg-white px-10 py-6 text-lg font-semibold text-dark-blue shadow-2xl transition-transform hover:scale-105 hover:bg-gray-200"
          >
            Registrarme Ahora
          </Button>
        </Link>
        <p className="mt-4 max-w-2xl font-bold text-primary-foreground/90 md:text-lg/relaxed">
          Si deseas mayor información y/o pasar a empleado formal contáctame
        </p>
      </div>
    </section>
  );
}
