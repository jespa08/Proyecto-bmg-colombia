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
import { AnimatedSection } from '@/components/landing/animated-section';

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <main className="flex-1">
        <HeroSection />
        <AnimatedSection id="about" className="py-16 md:py-24 lg:py-32" showWaves showZigzag>
          <AboutSection />
        </AnimatedSection>
        <AnimatedSection id="project" className="bg-dark-blue text-white py-16 md:py-24 lg:py-32" showNotes showWaves>
          <ProjectSection />
        </AnimatedSection>
        <AnimatedSection id="revenue-model" className="py-16 md:py-24 lg:py-32 bg-background text-foreground" showWaves showZigzag>
          <RevenueModelSection />
        </AnimatedSection>
        <AnimatedSection id="earnings" className="bg-dark-blue text-white py-16 md:py-24 lg:py-32" showNotes showWaves>
          <EarningsSection />
        </AnimatedSection>
        <AnimatedSection id="opportunities" className="bg-muted py-16 md:py-24 lg:py-32" showWaves showZigzag>
          <OpportunitiesSection />
        </AnimatedSection>
        <AnimatedSection id="social" className="py-16 md:py-24 lg:py-32" showWaves showZigzag>
          <SocialResponsibilitySection />
        </AnimatedSection>
        <AnimatedSection id="testimonial" className="py-16 md:py-24 lg:py-32" showWaves>
          <TestimonialSection />
        </AnimatedSection>
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
