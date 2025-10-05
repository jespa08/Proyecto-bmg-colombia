import { HeroSection } from '@/components/landing/hero-section';
import { AboutSection } from '@/components/landing/about-section';
import { ProjectSection } from '@/components/landing/project-section';
import { EarningsSection } from '@/components/landing/earnings-section';
import { OpportunitiesSection } from '@/components/landing/opportunities-section';
import { SocialResponsibilitySection } from '@/components/landing/social-responsibility-section';
import { CtaSection } from '@/components/landing/cta-section';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ProjectSection />
        <EarningsSection />
        <OpportunitiesSection />
        <SocialResponsibilitySection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
