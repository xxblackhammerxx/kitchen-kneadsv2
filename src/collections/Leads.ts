import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'createdAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'state',
      type: 'text',
    },
    {
      name: 'estimatedBill',
      type: 'number',
    },
    {
      name: 'systemSize',
      type: 'text',
    },
    {
      name: 'savings',
      type: 'number',
    },
    {
      name: 'message',
      type: 'textarea',
    },
  ],
  timestamps: true,
}
