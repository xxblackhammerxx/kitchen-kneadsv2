import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Heart, Leaf, Users } from 'lucide-react'

const AboutSection = () => {
  const values = [
    {
      icon: Heart,
      title: 'Family Tradition',
      description:
        'Three generations of culinary passion, bringing you time-tested quality and authentic ingredients.',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description:
        'Hand-selected products from trusted artisans and suppliers who share our commitment to excellence.',
    },
    {
      icon: Users,
      title: 'Community First',
      description:
        'Supporting local producers while building a community of passionate home cooks and bakers.',
    },
    {
      icon: Leaf,
      title: 'Sustainable Future',
      description:
        'Committed to eco-friendly practices and sustainable sourcing for a healthier planet.',
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Empowering Kitchen Dreams Since 1985
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              At Kitchen Kneads, we believe that great food starts with great ingredients and the
              right tools. Our mission is to empower people to take food and nutrition into their
              own hands for a happier, healthier, and more meaningful life.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              From artisan bakers to modern food preppers, we&apos;ve been serving passionate cooks
              with premium supplies, scratch cooking ingredients, and expert guidance. Every product
              is carefully curated to meet our high standards of quality and sustainability.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Learn Our Story
            </Button>
          </div>

          {/* Values Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-border/50 hover:shadow-warm transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
