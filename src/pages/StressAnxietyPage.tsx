import {
  StressHero,
  BreathingExercise,
  ToolsSection,
  StressCTABanner,
  StressTestimonials,
  StressQuiz,
  StressPricing,
} from '../components/stress';

/**
 * StressAnxietyPage — composed from all stress & anxiety sections.
 * Matches the original vanilla TS page order:
 * Hero → Breathing → Tools → CTA Banner → First-Aid Library →
 * Testimonials → GAD-7 Quiz → Pricing
 */
export default function StressAnxietyPage() {
  return (
    <>
      <StressHero />
      <BreathingExercise />
      <ToolsSection />
      <StressCTABanner />
      <StressTestimonials />
      <StressQuiz />
      <StressPricing />
    </>
  );
}
