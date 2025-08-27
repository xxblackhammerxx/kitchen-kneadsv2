'use client'

import { BlogPostCard } from '@/components/BlogPostCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Category, Post } from '@/payload-types'
import { Filter, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface BlogListingProps {
  initialPosts: Post[]
  categories: Category[]
}

export function BlogListing({ initialPosts, categories }: BlogListingProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      !searchTerm ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory =
      !selectedCategory ||
      (typeof post.category === 'object' && post.category?.id === selectedCategory)

    return matchesSearch && matchesCategory
  })

  const handleCategoryFilter = (categoryId: number | null) => {
    setSelectedCategory(categoryId)
  }

  return (
    <div className="space-y-10">
      {/* Search and Filter Section */}
      <div className="bg-card backdrop-blur-sm p-8 rounded  shadow-warm">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
          {/* Search */}
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 transition-colors group-focus-within:text-primary" />
            <Input
              placeholder="Search for recipes, tips, or ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-base bg-background/50 border-border/50 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter by:</span>
            </div>

            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCategoryFilter(null)}
              className="rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105"
            >
              All Posts
            </Button>

            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                asChild
                className="rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                <Link href={`/blog/category/${category.slug}`}>{category.name}</Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        {(searchTerm || selectedCategory) && (
          <div className="mt-4 pt-4 border-t border-border/30">
            <p className="text-sm text-muted-foreground">
              Found <span className="font-semibold text-foreground">{filteredPosts.length}</span>
              {filteredPosts.length === 1 ? ' post' : ' posts'}
              {searchTerm && (
                <span>
                  {' '}
                  matching "<span className="font-medium text-primary">{searchTerm}</span>"
                </span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogPostCard key={post.id} post={post as any} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-3">No posts found</h3>
            <p className="text-muted-foreground leading-relaxed">
              {searchTerm || selectedCategory
                ? 'Try adjusting your search terms or explore different categories'
                : 'No blog posts have been published yet. Check back soon for delicious content!'}
            </p>
            {(searchTerm || selectedCategory) && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  handleCategoryFilter(null)
                }}
                className="mt-6 rounded-full"
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
