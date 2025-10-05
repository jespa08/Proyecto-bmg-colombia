import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank, TrendingUp, Award } from "lucide-react";

const opportunities = [
  {
    icon: PiggyBank,
    title: "Fondos de Inversión",
    description: "Invierte en fondos con retornos estables, similar a un CDT, apoyando el crecimiento de la industria musical.",
  },
  {
    icon: TrendingUp,
    title: "Acciones de la Compañía",
    description: "Sé parte de nuestro éxito. Próximamente, BMG cotizará en el mercado Nasdaq de EE. UU.",
  },
  {
    icon: Award,
    title: "Eventos y Premios",
    description: "Participa en actividades sociales, concursos y eventos exclusivos para nuestra comunidad con increíbles premios.",
  },
];

export function OpportunitiesSection() {
  return (
    <section id="opportunities" className="w-full bg-muted py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
            Otras Oportunidades
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            BMG ofrece más formas de crecer y participar.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
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
