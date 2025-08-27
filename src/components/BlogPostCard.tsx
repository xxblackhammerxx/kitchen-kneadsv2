import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import type { Category, Media, Post, User } from '@/payload-types'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

interface BlogPostCardProps {
  post: Post & {
    featuredImage?: Media
    category?: Category
    author?: User
  }
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  // Use a consistent fallback date to prevent hydration mismatches
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt)
    : new Date(post.createdAt || '2024-01-01')

  return (
    <Card className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-luxury hover:-translate-y-1">
      <CardHeader className="p-0">
        {post.featuredImage && (
          <Link href={`/blog/${post.slug}`}>
            <div className="relative aspect-[4/3] overflow-hidden bg-muted/30">
              <Image
                src={
                  typeof post.featuredImage === 'string'
                    ? post.featuredImage
                    : post.featuredImage.url || ''
                }
                alt={
                  typeof post.featuredImage === 'string'
                    ? post.title
                    : post.featuredImage.alt || post.title
                }
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </Link>
        )}
      </CardHeader>

      <CardContent className="p-7">
        <div className="flex items-center gap-3 mb-4">
          {post.category && (
            <Link
              href={`/blog/category/${typeof post.category === 'string' ? post.category : post.category.slug}`}
            >
              <Badge
                variant="secondary"
                style={{
                  backgroundColor:
                    typeof post.category === 'string'
                      ? 'hsl(var(--primary) / 0.1)'
                      : (post.category.color || 'hsl(var(--primary))') + '20',
                  color:
                    typeof post.category === 'string'
                      ? 'hsl(var(--primary))'
                      : post.category.color || 'hsl(var(--primary))',
                  borderColor:
                    typeof post.category === 'string'
                      ? 'hsl(var(--primary) / 0.2)'
                      : (post.category.color || 'hsl(var(--primary))') + '40',
                }}
                className="hover:scale-105 transition-all duration-200 cursor-pointer font-medium px-3 py-1 border"
              >
                {typeof post.category === 'string' ? post.category : post.category.name}
              </Badge>
            </Link>
          )}
          {post.readingTime && (
            <span className="text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
              {post.readingTime} min read
            </span>
          )}
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="block group-hover:text-primary transition-colors"
        >
          <h3 className="text-xl font-bold mb-3 line-clamp-2 leading-tight">{post.title}</h3>
        </Link>

        {post.excerpt && (
          <p className="text-muted-foreground line-clamp-3 leading-relaxed text-sm">
            {post.excerpt}
          </p>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between p-7 pt-0 border-t border-border/30 mt-auto">
        <div className="flex items-center gap-3">
          <p className="text-xs text-muted-foreground mt-1">
            {format(publishedDate, 'MMM d, yyyy')}
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}
