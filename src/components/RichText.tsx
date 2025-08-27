import { serializeLexical } from '@/lib/lexical'

interface RichTextProps {
  content: any
  className?: string
}

export function RichText({ content, className = '' }: RichTextProps) {
  if (!content) return null

  return (
    <div
      className={`prose prose-lg max-w-none dark:prose-invert ${className}`}
      dangerouslySetInnerHTML={{ __html: serializeLexical(content) }}
    />
  )
}
