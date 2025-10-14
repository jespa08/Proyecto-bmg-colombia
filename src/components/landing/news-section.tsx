import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const newsItems = [
  {
    title: 'Nueva Alianza Estratégica entre BMG y Spotify',
    description: 'BMG y Spotify anuncian un acuerdo de licencia directa en EE. UU., fortaleciendo su colaboración para beneficiar a artistas y compositores.',
    link: 'https://newsroom.spotify.com/2025-10-08/bmg-spotify-direct-licensing-us-deal/',
  },
  {
    title: 'BMG y Google Cloud Impulsan la Transparencia en Regalías con IA',
    description: 'BMG utiliza la IA de Google Cloud para desarrollar StreamSight, una herramienta que ofrece pronósticos de regalías más precisos y transparentes para los artistas.',
    link: 'https://cloud.google.com/blog/products/media-entertainment/streamsight-driving-transparency-in-music-royalties-with-ai-powered-forecasting?utm_source=chatgpt.com',
  },
];

export function NewsSection() {
  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
          Últimas Noticias
        </h2>
        <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
          Mantente al día con las últimas innovaciones y alianzas de BMG.
        </p>
      </div>
      <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
        {newsItems.map((item, index) => (
          <Card key={index} className="flex flex-col overflow-hidden transition-transform hover:scale-105 hover:shadow-xl">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription className="pt-2">{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1" />
            <CardFooter>
              <Link href={item.link} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" className="w-full">
                  Leer Más <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
