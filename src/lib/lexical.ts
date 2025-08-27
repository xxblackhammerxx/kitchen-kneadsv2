// Simple lexical serializer for basic HTML output
// For production, consider using @payloadcms/richtext-lexical serializers

export function serializeLexical(content: any): string {
  if (!content || !content.root || !content.root.children) {
    return ''
  }

  return serializeChildren(content.root.children)
}

function serializeChildren(children: any[]): string {
  return children.map(serializeNode).join('')
}

function serializeNode(node: any): string {
  if (!node) return ''

  switch (node.type) {
    case 'paragraph':
      return `<p>${serializeChildren(node.children || [])}</p>`

    case 'heading':
      const level = node.tag || 'h2'
      return `<${level}>${serializeChildren(node.children || [])}</${level}>`

    case 'list':
      const listType = node.listType === 'number' ? 'ol' : 'ul'
      return `<${listType}>${serializeChildren(node.children || [])}</${listType}>`

    case 'listitem':
      return `<li>${serializeChildren(node.children || [])}</li>`

    case 'quote':
      return `<blockquote>${serializeChildren(node.children || [])}</blockquote>`

    case 'link':
      const url = node.fields?.url || node.url || '#'
      return `<a href="${url}" ${node.fields?.newTab ? 'target="_blank" rel="noopener noreferrer"' : ''}>${serializeChildren(node.children || [])}</a>`

    case 'text':
      let text = node.text || ''

      if (node.format) {
        if (node.format & 1) text = `<strong>${text}</strong>` // bold
        if (node.format & 2) text = `<em>${text}</em>` // italic
        if (node.format & 4) text = `<s>${text}</s>` // strikethrough
        if (node.format & 8) text = `<u>${text}</u>` // underline
        if (node.format & 16) text = `<code>${text}</code>` // code
      }

      return text

    case 'linebreak':
      return '<br>'

    default:
      // For unknown node types, try to serialize children
      if (node.children) {
        return serializeChildren(node.children)
      }
      return ''
  }
}
