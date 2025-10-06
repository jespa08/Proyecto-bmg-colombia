import { CreditCard } from "lucide-react";

export function CreditCardSection() {
  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CreditCard className="h-8 w-8" />
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
          Beneficio: Tarjeta de Crédito BMG
        </h2>
        <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
          La función principal de la <strong className="text-primary">tarjeta de crédito BMG</strong> es ayudar a los nuevos empleados a gestionar sus fondos de manera más flexible.
        </p>
        <p className="mt-4 text-muted-foreground md:text-lg/relaxed">
          Los nuevos empleados pueden solicitar la tarjeta de crédito BMG para <strong className="text-primary">retirar por adelantado el depósito laboral pagado</strong> a su cuenta de Nequi, y posteriormente <strong className="text-primary">reembolsar el monto de la tarjeta en cuotas</strong> con el salario que generen diariamente al reproducir música en la plataforma BMG. El proceso de revisión tarda de 1 a 15 días hábiles. Tras la aprobación, el importe del depósito se abonará directamente en la cuenta BMG del empleado registrada en la plataforma, lo que garantiza un pago seguro y rápido.
        </p>
      </div>
    </div>
  );
}
