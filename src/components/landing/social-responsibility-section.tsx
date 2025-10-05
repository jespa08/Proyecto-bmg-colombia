import { HeartHandshake, School, Briefcase, Verified } from "lucide-react";

const commitments = [
  {
    icon: HeartHandshake,
    title: "Asistencia a Zonas Vulnerables",
    description: "Llevamos ayuda y oportunidades a comunidades que más lo necesitan.",
  },
  {
    icon: School,
    title: "Apoyo a la Educación Infantil",
    description: "Fomentamos el futuro de los niños a través de programas educativos.",
  },
  {
    icon: Briefcase,
    title: "Empleo Remoto Inclusivo",
    description: "Creamos oportunidades de trabajo accesibles para todos, sin importar su ubicación.",
  },
  {
    icon: Verified,
    title: "Proyectos Verificados",
    description: "Garantizamos la transparencia con donaciones y proyectos culturales verificables.",
  },
];

export function SocialResponsibilitySection() {
  return (
    <section id="social" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
            Responsabilidad Social
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            Extractos de nuestro Libro Blanco Estratégico para Colombia.
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
