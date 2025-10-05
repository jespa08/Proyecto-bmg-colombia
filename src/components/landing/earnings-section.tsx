import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WalletCards, Rocket, Crown, CheckCircle2 } from "lucide-react";

const levels = [
  {
    icon: WalletCards,
    title: "Nivel A3",
    investment: "$470.000",
    tasks: "6 tareas diarias",
    earnings: "$15.600 diarios",
    contract: "Contrato por 2 años",
  },
  {
    icon: Rocket,
    title: "Nivel B1",
    investment: "$1.570.000",
    tasks: "12 tareas diarias",
    earnings: "$54.000 diarios",
    contract: "Contrato por 3 años",
  },
  {
    icon: Crown,
    title: "Nivel B2",
    investment: "$3.970.000",
    tasks: "24 tareas diarias",
    earnings: "$144.000 diarios",
    contract: "Contrato por 3 años",
  },
];

export function EarningsSection() {
  return (
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
            Niveles y Ganancias
          </h2>
          <p className="mt-4 text-neutral-300 md:text-xl/relaxed">
            Invierte en tu futuro y en el de la música. Gana dinero apoyando a nuevos artistas.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {levels.map((level) => (
            <Card key={level.title} className="flex flex-col border-2 border-primary/50 bg-transparent shadow-lg transition-all hover:border-primary hover:shadow-primary/20 text-white">
              <CardHeader className="flex-row items-center gap-4">
                <level.icon className="h-10 w-10 text-primary" />
                <CardTitle className="text-2xl font-bold">{level.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-primary" />Inversión: <strong>{level.investment}</strong></li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-primary" />{level.tasks}</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-primary" />Ganancias: <strong>{level.earnings}</strong></li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-primary" />{level.contract}</li>
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-center text-neutral-300">
          Los usuarios de nivel B pueden retirar los jueves y los de nivel A los viernes. Pagos fáciles, rápidos y seguros.
        </p>
      </div>
  );
}
