import Link from "next/link";
import { Instagram, Facebook, Globe, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-black py-8 text-neutral-400">
      <div className="container mx-auto flex flex-col items-center justify-center gap-6 px-4 text-center md:px-6">
        <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
          <h3 className="font-headline text-2xl font-bold tracking-tighter text-white">
            BMG<span className="text-primary">.</span>
          </h3>
          <p className="text-sm">“Música sin fronteras, amor sin límites.”</p>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.instagram.com/thenewbmg/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-colors hover:text-white"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.facebook.com/BMGRM"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition-colors hover:text-white"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.youtube.com/bmg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="transition-colors hover:text-white"
            >
              <Youtube className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.bmg.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Página web"
              className="transition-colors hover:text-white"
            >
              <Globe className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <p className="text-xs">
          © 2025 BMG Rights Management (UK) – Proyecto BMG Colombia
        </p>
      </div>
    </footer>
  );
}
