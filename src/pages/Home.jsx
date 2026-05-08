import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import ServicesPreview from '@/components/home/ServicesPreview';
import ProcessSection from '@/components/home/ProcessSection';
import StatsSection from '@/components/home/StatsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <div>
      <HeroSection heroImage="https://media.base44.com/images/public/69fd8ecf8aee9bf831b455dc/bc3acfd2f_generated_82acfec8.png" />
      <StatsSection />
      <FeaturedProjects />
      <ServicesPreview />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}