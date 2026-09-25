import React from 'react'
import LandingHero from '../components/landing/LandingHero'
import ValueProps from '../components/landing/ValueProps'
import UniversityTrust from '../components/landing/UniversityTrust'
import FeatureShowcase from '../components/landing/FeatureShowcase'
import PricingSection from '../components/landing/PricingSection'
import Testimonials from '../components/landing/Testimonials'
import FAQSection from '../components/landing/FAQSection'
import LandingFooter from '../components/landing/LandingFooter'

export default function HomePage() {
  return (
    <div className="w-full bg-slate-50 dark:bg-dark-950 text-slate-900 dark:text-slate-100 transition-colors">
      <LandingHero />
      <ValueProps />
      <UniversityTrust />
      <FeatureShowcase />
      <PricingSection />
      <Testimonials />
      <FAQSection />
      <LandingFooter />
    </div>
  )
}

