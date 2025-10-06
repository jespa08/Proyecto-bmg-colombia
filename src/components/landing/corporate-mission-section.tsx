import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const missions = [
  {
    number: '01',
    title: 'Servicios de Gestión de Derechos de Autor Justos y Transparentes',
    description: 'BMG se compromete a gestionar los derechos de autor de la música de forma eficiente y transparente para garantizar que los artistas, compositores y propietarios de derechos de autor reciban los ingresos y los derechos que merecen.',
    imageId: 'vinyl-record',
  },
  {
    number: '02',
    title: 'Promover la Transformación Digital y la Innovación',
    description: 'Con la ayuda de plataformas digitales avanzadas y herramientas tecnológicas, BMG simplifica los procesos tradicionales de publicación y optimiza el análisis de datos, las licencias y la distribución de ingresos.',
    imageId: 'music-studio',
  },
  {
    number: '03',
    title: 'Promover la Difusión de la Música Global y la Integración de Culturas',
    description: 'BMG coopera activamente con las principales plataformas y empresas musicales mundiales para apoyar a artistas de diferentes regiones y orígenes culturales.',
    imageId: 'singer-guitar',
  },
  {
    number: '04',
    title: 'Brindar Oportunidades de Empleo y Emprendimiento Sostenibles',
    description: 'A través de su plataforma online y modelo de trabajo remoto, BMG proporciona una fuente estable de ingresos a millones de usuarios, especialmente en zonas como Colombia, brindando oportunidades de empleo y crecimiento.',
    imageId: 'remote-work',
  },
  {
    number: '05',
    title: 'Crear una "Nueva Compañía Musical" Centrada en los Creadores',
    description: 'A diferencia de las compañías discográficas tradicionales, BMG enfatiza la "Orientación al Servicio" y está comprometida a construir un nuevo ecosistema musical que sea más amigable, justo y autónomo para los artistas.',
    imageId: 'dj-mixer',
  },
];

export function CorporateMissionSection() {
  const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Misión Corporativa
        </h2>
      </div>
      <div className="mx-auto mt-12 grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
        {missions.slice(0, 3).map((mission) => {
          const imageData = getImage(mission.imageId);
          return (
            <div key={mission.number} className="flex flex-col gap-4">
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-bold text-primary">{mission.number}</span>
                <h3 className="text-xl font-bold">{mission.title}</h3>
              </div>
              <p className="text-neutral-300">{mission.description}</p>
              {imageData && (
                <div className="mt-auto overflow-hidden rounded-lg">
                  <Image
                    src={imageData.imageUrl}
                    alt={imageData.description}
                    width={600}
                    height={400}
                    className="h-48 w-full object-cover transition-transform hover:scale-105"
                    data-ai-hint={imageData.imageHint}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mx-auto mt-8 grid max-w-7xl gap-8 md:grid-cols-2">
        {missions.slice(3).map((mission) => {
            const imageData = getImage(mission.imageId);
            return (
                <div key={mission.number} className="flex flex-col gap-4">
                <div className="flex items-baseline gap-4">
                    <span className="text-5xl font-bold text-primary">{mission.number}</span>
                    <h3 className="text-xl font-bold">{mission.title}</h3>
                </div>
                <p className="text-neutral-300">{mission.description}</p>
                {imageData && (
                    <div className="mt-auto overflow-hidden rounded-lg">
                    <Image
                        src={imageData.imageUrl}
                        alt={imageData.description}
                        width={600}
                        height={400}
                        className="h-48 w-full object-cover transition-transform hover:scale-105"
                        data-ai-hint={imageData.imageHint}
                    />
                    </div>
                )}
                </div>
            );
        })}
      </div>
    </div>
  );
}
