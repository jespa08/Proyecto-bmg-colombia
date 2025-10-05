import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Briefcase } from "lucide-react";
import Image from "next/image";

const opportunities = [
  {
    icon: Music,
    title: "Fondo Notas Doradas",
    description: "BMG invierte en obras musicales a nivel global, generando dividendos estables que se distribuyen proporcionalmente entre los empleados. Crece con BMG y disfruta de ingresos pasivos a largo plazo.",
  },
  {
    icon: Briefcase,
    title: "Opciones sobre Acciones BMG",
    description: "Los empleados a tiempo completo pueden acceder a planes de opciones sobre acciones de BMG, beneficiándose del crecimiento de la compañía, proyectada para cotizar en Nasdaq EE. UU.",
  },
];

export function OpportunitiesSection() {
  return (
    <section id="opportunities" className="relative w-full bg-muted py-16 md:py-24 lg:py-32">
      <Image
        src="https://storage.googleapis.com/project-spark-308622-users-code/user-2d2d3c90-e5a9-4598-a83a-438902d184cf/src/assets/logo.png"
        alt="BMG Colombia"
        width={60}
        height={60}
        className="absolute top-4 right-4"
      />
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
            Otras Oportunidades
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            BMG ofrece más formas de crecer y participar.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
          {opportunities.map((opportunity) => (
            <Card key={opportunity.title} className="text-center transition-transform hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <opportunity.icon className="h-8 w-8" />
                </div>
                <CardTitle className="mt-4 text-xl font-bold">{opportunity.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{opportunity.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
