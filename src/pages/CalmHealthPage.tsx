import {
  HealthHero,
  HealthCategories,
  HealthBenefits,
  HealthPartner,
  HealthEngagement,
  HealthPricing,
  HealthWhy,
  HealthAction,
} from '../components/health';

/**
 * Calm Health / UniCare Health Landing Page.
 * Built with the Warmth & Care palette and professional SaaS-style enterprise layout.
 * Sections: Hero -> Cards -> Get To Know -> Best-in-Class Stats -> Pricing
 */
export default function CalmHealthPage() {
  return (
    <>
      <HealthHero />
      <HealthCategories />
      <HealthBenefits />
      <HealthPartner />
      <HealthWhy />
      <HealthEngagement />
      <HealthPricing />
      <HealthAction />
    </>
  );
}
