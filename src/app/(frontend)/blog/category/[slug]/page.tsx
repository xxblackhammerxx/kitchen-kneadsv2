import { BlogPostCard } from '@/components/BlogPostCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import getPayloadClient from '@/lib/payload'
import type { Category, Post } from '@/payload-types'
import { ArrowLeft } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const payload = await getPayloadClient()

  const { docs: categories } = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: resolvedParams.slug,
      },
    },
    limit: 1,
  })

  const category = categories[0]

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.name} - Blog Category`,
    description: category.description || `Browse all posts in the ${category.name} category`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params
  const payload = await getPayloadClient()

  // Find the category
  const { docs: categories } = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: resolvedParams.slug,
      },
    },
    limit: 1,
  })

  const category = categories[0] as Category

  if (!category) {
    notFound()
  }

  // Find posts in this category
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      category: {
        equals: category.id,
      },
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back to Blog Button */}
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      {/* Category Header */}
      <div className="text-center mb-12">
        <Badge
          className="mb-4 text-lg px-4 py-2"
          style={{
            backgroundColor: (category.color || '#3B82F6') + '20',
            color: category.color || '#3B82F6',
          }}
        >
          {category.name}
        </Badge>
        <h1 className="text-4xl font-bold mb-4 text-black">{category.name} Posts</h1>
        {category.description && (
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{category.description}</p>
        )}
        <p className="text-sm text-muted-foreground mt-4">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: Post) => (
            <BlogPostCard key={post.id} post={post as any} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">No posts found</h3>
          <p className="text-muted-foreground">
            No posts have been published in this category yet.
          </p>
          <Button asChild className="mt-4">
            <Link href="/blog">Browse All Posts</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
