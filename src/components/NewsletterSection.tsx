import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Gift, BookOpen, Users } from "lucide-react";

const NewsletterSection = () => {
  const benefits = [
    {
      icon: Gift,
      title: "Exclusive Offers",
      description: "Get early access to sales and member-only discounts"
    },
    {
      icon: BookOpen,
      title: "Recipe Collections",
      description: "Monthly recipe guides and cooking tips from our experts"
    },
    {
      icon: Users,
      title: "Community Access",
      description: "Join our community of passionate home cooks and bakers"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Join Our Kitchen Community
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get exclusive recipes, cooking tips, and special offers delivered to your inbox. 
              Plus, receive our free "Essential Prepper Checklist" when you subscribe!
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-border/50">
                <CardContent className="p-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter Form */}
          <Card className="max-w-lg mx-auto border-border/50 shadow-warm">
            <CardContent className="p-8">
              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    First Name (Optional)
                  </label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Enter your first name"
                    className="w-full"
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">
                  Subscribe & Get Free Checklist
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;