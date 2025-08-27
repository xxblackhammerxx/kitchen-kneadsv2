import type { CollectionConfig } from 'payload'

export const States: CollectionConfig = {
  slug: 'states',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'abbreviation'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'abbreviation',
      type: 'text',
      required: true,
      maxLength: 2,
    },
  ],
  timestamps: true,
}
