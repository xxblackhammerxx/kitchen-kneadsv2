import AboutSection from '@/components/AboutSection'
import { BlogSection } from '@/components/BlogSection'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import Navigation from '@/components/Navigation'
import NewsletterSection from '@/components/NewsletterSection'
import TestimonialsSection from '@/components/TestimonialsSection'

const Homepage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        {/* <FeaturedProducts /> */}
        <AboutSection />
        <BlogSection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}

export default Homepage
