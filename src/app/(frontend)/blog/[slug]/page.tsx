import { RichText } from '@/components/RichText'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import getPayloadClient from '@/lib/payload'
import type { User as AuthorType, Category, Media, Post } from '@/payload-types'
import { format } from 'date-fns'
import { ArrowLeft, Clock, Tag, User } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: params.slug,
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
    limit: 1,
  })

  const post = docs[0]

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const metaTitle = post.seo?.metaTitle || post.title
  const metaDescription = post.seo?.metaDescription || post.excerpt || ''
  const metaImage = post.seo?.metaImage || post.featuredImage

  return {
    title: `${metaTitle} - Kitchen Kneads Blog`,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'article',
      publishedTime: post.publishedAt || '',
      authors:
        typeof post.author === 'object' && post.author
          ? [`${post.author.firstName || ''} ${post.author.lastName || ''}`.trim()]
          : [],
      images: metaImage && typeof metaImage === 'object' && metaImage.url ? [metaImage.url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: metaImage && typeof metaImage === 'object' && metaImage.url ? [metaImage.url] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: params.slug,
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
    limit: 1,
  })

  const post = docs[0] as Post & {
    featuredImage?: Media
    category?: Category
    author?: AuthorType
  }

  if (!post) {
    notFound()
  }

  const publishedDate = post.publishedAt ? new Date(post.publishedAt) : new Date()

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back to Blog Button */}
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      {/* Article Header */}
      <header className="mb-8">
        {post.category && (
          <Badge
            className="mb-4"
            style={{
              backgroundColor:
                typeof post.category === 'string'
                  ? '#3B82F6'
                  : (post.category.color || '#3B82F6') + '20',
              color:
                typeof post.category === 'string' ? '#3B82F6' : post.category.color || '#3B82F6',
            }}
          >
            {typeof post.category === 'string' ? post.category : post.category.name}
          </Badge>
        )}

        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-black">
          {post.title}
        </h1>

        {post.excerpt && <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>}

        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-6 text-sm border-b pb-6">
          {post.author && typeof post.author === 'object' && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>
                {`${post.author.firstName || ''} ${post.author.lastName || ''}`.trim() ||
                  'Anonymous'}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <time dateTime={post.publishedAt || ''}>{format(publishedDate, 'MMMM d, yyyy')}</time>
          </div>

          {post.readingTime && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
          )}
        </div>
      </header>

      {/* Featured Image */}
      {post.featuredImage && typeof post.featuredImage === 'object' && (
        <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.featuredImage.url || ''}
            alt={post.featuredImage.alt || post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Article Content */}
      <div className="mb-8">
        <RichText content={post.content} />
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex items-center gap-2 mb-8 pt-6 border-t">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-wrap gap-2">
            {post.tags.map(
              (tagItem, index) =>
                tagItem.tag && (
                  <Badge key={index} variant="secondary">
                    {tagItem.tag}
                  </Badge>
                ),
            )}
          </div>
        </div>
      )}

      {/* Author Bio */}
      {post.author && typeof post.author === 'object' && post.author.bio && (
        <div className="bg-card p-6 rounded-lg border">
          <div className="flex items-start gap-4">
            {post.author.avatar && typeof post.author.avatar === 'object' && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={post.author.avatar.url || ''}
                  alt={
                    `${post.author.firstName || ''} ${post.author.lastName || ''}`.trim() ||
                    'Author'
                  }
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-lg mb-2">
                About{' '}
                {`${post.author.firstName || ''} ${post.author.lastName || ''}`.trim() ||
                  'the Author'}
              </h3>
              <p className="text-muted-foreground">{post.author.bio}</p>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
