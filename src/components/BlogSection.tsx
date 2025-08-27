import { BlogPostCard } from '@/components/BlogPostCard'
import { Button } from '@/components/ui/button'
import getPayloadClient from '@/lib/payload'
import type { Post } from '@/payload-types'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export async function BlogSection() {
  const payload = await getPayloadClient()

  try {
    // Fetch latest 3 published posts
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
      limit: 3,
    })

    if (!posts || posts.length === 0) {
      // Return a consistent fallback structure instead of null
      return (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest from Our Blog</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                We're working on some amazing content for you. Check back soon!
              </p>
              <Button asChild size="lg">
                <Link href="/blog" className="flex items-center gap-2">
                  Visit Blog
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )
    }

    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest from Our Blog</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover recipes, baking tips, and culinary insights from our kitchen to yours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {posts.map((post: Post) => (
              <BlogPostCard key={post.id} post={post as any} />
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/blog" className="flex items-center gap-2">
                View All Posts
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    )
  } catch (error) {
    console.error('Error fetching blog posts:', error)

    // Return a consistent fallback structure instead of null
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest from Our Blog</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Stay tuned for exciting recipes and kitchen tips coming soon!
            </p>
            <Button asChild size="lg">
              <Link href="/blog" className="flex items-center gap-2">
                Visit Blog
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    )
  }
}
