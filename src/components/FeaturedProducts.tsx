import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingCart } from "lucide-react";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Professional Chef's Knife Set",
      price: "$299.99",
      originalPrice: "$399.99",
      rating: 4.9,
      reviews: 247,
      image: "https://images.unsplash.com/photo-1594736797933-d0aeac2c0b3e?w=400&h=400&fit=crop",
      category: "Kitchen Supplies",
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Artisan Sourdough Starter Kit",
      price: "$45.99",
      rating: 4.8,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
      category: "Baking Essentials",
      badge: "New"
    },
    {
      id: 3,
      name: "Premium Food Storage Containers",
      price: "$89.99",
      originalPrice: "$119.99",
      rating: 4.9,
      reviews: 432,
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
      category: "Food Storage",
      badge: "Sale"
    },
    {
      id: 4,
      name: "Organic Spice Collection",
      price: "$67.99",
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop",
      category: "Ingredients",
      badge: "Organic"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked premium supplies to elevate your culinary adventures
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-1 border-border/50">
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Badge */}
                  {product.badge && (
                    <div className={`absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-full ${
                      product.badge === 'Sale' 
                        ? 'bg-primary text-primary-foreground' 
                        : product.badge === 'New'
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-accent text-accent-foreground'
                    }`}>
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-primary">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;