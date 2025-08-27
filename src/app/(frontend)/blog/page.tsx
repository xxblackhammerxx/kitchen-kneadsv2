import { BlogListing } from '@/components/BlogListing'
import getPayloadClient from '@/lib/payload'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Kitchen Kneads',
  description: 'Latest recipes, baking tips, and culinary insights from Kitchen Kneads',
}

export default async function BlogPage() {
  const payload = await getPayloadClient()

  // Fetch published posts with their relationships
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    populate: {
      featuredImage: true,
      category: true,
      author: true,
    },
    sort: '-publishedAt',
    limit: 50,
  })

  // Fetch all categories
  const { docs: categories } = await payload.find({
    collection: 'categories',
    sort: 'name',
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-b border-border/20">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold pb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Blog
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Discover our latest recipes, baking tips, and culinary insights crafted with passion
              and expertise
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <BlogListing initialPosts={posts} categories={categories} />
      </div>
    </div>
  )
}
