'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Search, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { Logo } from './icons/Logo'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '/' },
    {
      name: 'Shop',
      children: [
        { name: 'Kitchen Supplies', href: '/shop/kitchen-supplies' },
        { name: 'Ingredients & Pantry', href: '/shop/ingredients' },
        { name: 'Baking Essentials', href: '/shop/baking' },
        { name: 'Scratch Cooking Kits', href: '/shop/scratch-cooking' },
        { name: 'Food Storage', href: '/shop/storage' },
      ],
    },
    { name: 'Recipes & Tips', href: '/recipes' },
    { name: 'Food Storage & Prepper', href: '/prepper' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-center px-2">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Logo className="text-red-900" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              <a
                href={item.href || '#'}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </a>
              {item.children && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {item.children.map((child) => (
                    <a
                      key={child.name}
                      href={child.href}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                    >
                      {child.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Cart</span>
          </Button>

          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="mt-6">
                {navItems.map((item) => (
                  <div key={item.name} className="mb-4">
                    <a
                      href={item.href || '#'}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors block mb-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                    {item.children && (
                      <div className="ml-4 space-y-2">
                        {item.children.map((child) => (
                          <a
                            key={child.name}
                            href={child.href}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors block"
                            onClick={() => setIsOpen(false)}
                          >
                            {child.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Navigation
