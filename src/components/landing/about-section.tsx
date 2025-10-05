import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="relative w-full py-16 md:py-24 lg:py-32">
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
            Sobre BMG
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            BMG Rights Management (UK), fundada en 2008 y parte del grupo global Bertelsmann, ofrece servicios de gestión de derechos de autor transparentes y eficientes para artistas y creadores musicales. En 2024, BMG inició su expansión oficial a Colombia con el propósito de crear empleo remoto legal y fomentar el desarrollo del talento musical local.
          </p>
        </div>
      </div>
    </section>
  );
}
