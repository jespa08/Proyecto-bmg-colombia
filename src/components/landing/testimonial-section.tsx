import Image from "next/image";

export function TestimonialSection() {
  return (
    <section id="testimonial" className="relative w-full py-16 md:py-24 lg:py-32">
      <Image
        src="https://storage.googleapis.com/project-spark-308622-users-code/user-2d2d3c90-e5a9-4598-a83a-438902d184cf/src/assets/logo.png"
        alt="BMG Colombia"
        width={60}
        height={60}
        className="absolute top-4 right-4"
      />
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-2xl font-medium text-foreground md:text-3xl/relaxed">
            “La música no tiene fronteras; usa la música para conectar el amor.”
          </p>
          <p className="mt-4 text-muted-foreground">
            — BMG Rights Management
          </p>
        </div>
      </div>
    </section>
  );
}
