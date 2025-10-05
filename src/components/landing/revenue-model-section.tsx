import Image from "next/image";

export function RevenueModelSection() {
  return (
    <section id="revenue-model" className="relative w-full py-16 md:py-24 lg:py-32 bg-background text-foreground">
      <Image
        src="https://storage.googleapis.com/project-spark-308622-users-code/user-2d2d3c90-e5a9-4598-a83a-438902d184cf/src/assets/logo.png"
        alt="BMG Colombia"
        width={60}
        height={60}
        className="absolute top-4 right-4"
      />
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Modelo de Ingresos Transparente
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            Los ingresos de BMG provienen de tarifas de promoción pagadas por empresas publicitarias, discográficas y artistas independientes. BMG no depende de los depósitos de los empleados; estos son una garantía simbólica de compromiso.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-5xl">
          <p className="mt-8 text-center text-muted-foreground">
            De los ingresos obtenidos, destinamos entre el 20% y el 40% al funcionamiento de la plataforma, mientras que el 60% al 80% restante se distribuye como salario entre los empleados. Esta distribución se realiza de acuerdo con el nivel y la contribución de cada uno, asegurando que quienes más se esfuerzan reciban la recompensa que merecen.
          </p>
        </div>
      </div>
    </section>
  );
}
