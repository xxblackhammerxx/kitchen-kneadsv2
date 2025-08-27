import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react'

const Footer = () => {
  const footerLinks = {
    shop: [
      { name: 'Kitchen Supplies', href: '/shop/kitchen-supplies' },
      { name: 'Baking Essentials', href: '/shop/baking' },
      { name: 'Ingredients & Pantry', href: '/shop/ingredients' },
      { name: 'Food Storage', href: '/shop/storage' },
      { name: 'Scratch Cooking Kits', href: '/shop/scratch-cooking' },
    ],
    resources: [
      { name: 'Recipes', href: '/recipes' },
      { name: 'Cooking Tips', href: '/recipes/tips' },
      { name: 'Blog', href: '/blog' },
      { name: 'Food Storage Guide', href: '/prepper' },
      { name: 'Buying Guides', href: '/guides' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Wholesale', href: '/wholesale' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
    ],
    support: [
      { name: 'Customer Service', href: '/support' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/kitchenknead', label: 'Facebook' },
    {
      icon: Instagram,
      href: 'https://www.instagram.com/kitchenkneads?igsh=MWV2NHl0ZXRqbWRxcw==',
      label: 'Instagram',
    },
    { icon: Youtube, href: 'https://www.youtube.com/@KitchenKneads', label: 'YouTube' },
  ]

  return (
    <footer className="bg-accent text-accent-foreground">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-4">Kitchen Kneads</h3>
            <p className="text-accent-foreground/80 mb-6 leading-relaxed">
              Empowering people to take food and nutrition into their own hands for a happier,
              healthier, and more meaningful life since 1985.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                <span className="text-sm text-accent-foreground/80">
                  3030 Grant Ave Ogden Ut, 84405
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-accent-foreground/80">888-881-9957</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-accent-foreground/80">info@kitchenkneads.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10 hover:text-primary"
                  asChild
                >
                  <a href={social.href} aria-label={social.label}>
                    <social.icon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold text-accent-foreground mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-accent-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-accent-foreground mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-accent-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-accent-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-accent-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-accent-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-accent-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-accent-foreground/10 pt-8 mb-8">
          <div className="max-w-md">
            <h4 className="font-semibold text-accent-foreground mb-2">Stay Updated</h4>
            <p className="text-sm text-accent-foreground/80 mb-4">
              Get the latest recipes, tips, and exclusive offers.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-accent-foreground/5 border-accent-foreground/20 text-accent-foreground placeholder:text-accent-foreground/50"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-accent-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-accent-foreground/80">
              © 2024 Kitchen Kneads. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="/privacy"
                className="text-sm text-accent-foreground/80 hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-sm text-accent-foreground/80 hover:text-primary transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/sitemap"
                className="text-sm text-accent-foreground/80 hover:text-primary transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
