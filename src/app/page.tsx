import { HeroSection } from '@/components/landing/hero-section';
import { AboutSection } from '@/components/landing/about-section';
import { ProjectSection } from '@/components/landing/project-section';
import { EarningsSection } from '@/components/landing/earnings-section';
import { OpportunitiesSection } from '@/components/landing/opportunities-section';
import { RevenueModelSection } from '@/components/landing/revenue-model-section';
import { SocialResponsibilitySection } from '@/components/landing/social-responsibility-section';
import { CtaSection } from '@/components/landing/cta-section';
import { Footer } from '@/components/landing/footer';
import { TestimonialSection } from '@/components/landing/testimonial-section';

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ProjectSection />
        <EarningsSection />
        <OpportunitiesSection />
        <RevenueModelSection />
        <SocialResponsibilitySection />
        <TestimonialSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}