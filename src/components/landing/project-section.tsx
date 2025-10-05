import Image from "next/image";

export function ProjectSection() {
  return (
    <section id="project" className="relative w-full bg-dark-blue py-16 text-white md:py-24 lg:py-32">
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
            Nuestro Proyecto en Colombia
          </h2>
          <p className="mt-4 md:text-xl/relaxed">
            Este proyecto apoya a artistas emergentes mediante una plataforma donde los usuarios escuchan canciones de 1 minuto. Las tareas son <span className="font-semibold text-primary">sencillas y permiten generar ingresos</span> mientras apoyas el crecimiento del sector musical. Se trabaja de lunes a sábado y los pagos se procesan semanalmente por Nequi o Bancolombia.
          </p>
        </div>
      </div>
    </section>
  );
}
