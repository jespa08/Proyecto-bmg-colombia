export function Footer() {
  return (
    <footer className="w-full bg-black py-8 text-neutral-400">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row md:px-6">
        <h3 className="font-headline text-2xl font-bold tracking-tighter text-white">
          BMG<span className="text-primary">.</span>
        </h3>
        <p className="text-sm">
          “Música sin fronteras, amor sin límites.”
        </p>
        <p className="text-xs">
          © 2025 BMG Rights Management (UK) – Proyecto BMG Colombia
        </p>
      </div>
    </footer>
  );
}
