// Utility function to calculate reading time from rich text content
// Assumes average reading speed of 200 words per minute

export function calculateReadingTime(content: any): number {
  if (!content || !content.root) return 0

  const text = extractTextFromLexical(content.root)
  const words = text.split(/\s+/).filter((word) => word.length > 0)
  const minutes = Math.ceil(words.length / 200)

  return Math.max(1, minutes) // Minimum 1 minute
}

function extractTextFromLexical(node: any): string {
  if (!node) return ''

  if (node.type === 'text') {
    return node.text || ''
  }

  if (node.children && Array.isArray(node.children)) {
    return node.children.map(extractTextFromLexical).join(' ')
  }

  return ''
}

// Format date for display
export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Format date for relative display (e.g., "2 days ago")
export function formatRelativeDate(date: string | Date): string {
  const d = new Date(date)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)

  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`

  return formatDate(date)
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

// Truncate text to a specific length
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...'
}
