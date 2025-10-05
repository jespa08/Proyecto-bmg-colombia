import { HeartHandshake, School, Briefcase, BookOpen } from "lucide-react";

const commitments = [
  {
    icon: HeartHandshake,
    title: "Asistencia a Zonas Vulnerables",
    description: "En Colombia, participamos en la asistencia a zonas afectadas por desastres, entregando alimentos y ayuda humanitaria.",
  },
  {
    icon: School,
    title: "Apoyo a la Educación Musical",
    description: "Impulsamos la educación musical en comunidades vulnerables para fomentar el futuro de los niños.",
  },
  {
    icon: Briefcase,
    title: "Empleo Remoto Inclusivo",
    description: "Creamos oportunidades de trabajo accesibles para todos, sin importar su ubicación.",
  },
  {
    icon: BookOpen,
    title: "BMG Talent Bootcamp",
    description: "Desarrollamos programas de formación en producción musical, marketing y derechos de autor.",
  },
];

export function SocialResponsibilitySection() {
  return (
    <section id="social" className="relative w-full py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
            Responsabilidad Social
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            BMG apoya causas sociales, impulsa la educación y brinda empleo remoto inclusivo.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-x-8 gap-y-12 sm:grid-cols-2 lg:max-w-none lg:grid-cols-4">
          {commitments.map((commitment) => (
            <div key={commitment.title} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <commitment.icon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-bold">{commitment.title}</h3>
              <p className="mt-2 text-muted-foreground">{commitment.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
