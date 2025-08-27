import getPayloadClient from '../src/lib/payload'

async function seed() {
  const payload = await getPayloadClient()

  try {
    console.log('🌱 Starting blog seed...')

    // Create categories
    const categories = [
      {
        name: 'Recipes',
        slug: 'recipes',
        description: 'Delicious recipes for every occasion',
        color: '#22c55e',
      },
      {
        name: 'Baking Tips',
        slug: 'baking-tips',
        description: 'Professional baking techniques and tips',
        color: '#f59e0b',
      },
      {
        name: 'Kitchen Tools',
        slug: 'kitchen-tools',
        description: 'Reviews and guides for kitchen equipment',
        color: '#3b82f6',
      },
      {
        name: 'Food Storage',
        slug: 'food-storage',
        description: 'Tips for preserving and storing food',
        color: '#8b5cf6',
      },
    ]

    const createdCategories = []
    for (const category of categories) {
      const created = await payload.create({
        collection: 'categories',
        data: category,
      })
      createdCategories.push(created)
      console.log(`✅ Created category: ${category.name}`)
    }

    // Get the first user to use as author
    const { docs: users } = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (users.length === 0) {
      console.log('❌ No users found. Please create a user first.')
      return
    }

    const author = users[0]

    // Create sample posts
    const posts = [
      {
        title: 'The Perfect Sourdough Starter Guide',
        slug: 'perfect-sourdough-starter-guide',
        excerpt:
          'Learn how to create and maintain a healthy sourdough starter for delicious homemade bread.',
        content: {
          root: {
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: "Creating the perfect sourdough starter is the foundation of great bread making. In this comprehensive guide, we'll walk you through every step of the process.",
                  },
                ],
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [
                  {
                    type: 'text',
                    text: "What You'll Need",
                  },
                ],
              },
              {
                type: 'list',
                listType: 'bullet',
                children: [
                  {
                    type: 'listitem',
                    children: [
                      {
                        type: 'text',
                        text: 'Whole wheat flour or all-purpose flour',
                      },
                    ],
                  },
                  {
                    type: 'listitem',
                    children: [
                      {
                        type: 'text',
                        text: 'Filtered water (chlorine-free)',
                      },
                    ],
                  },
                  {
                    type: 'listitem',
                    children: [
                      {
                        type: 'text',
                        text: 'Glass jar or plastic container',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'The key to a successful starter is consistency in feeding and maintaining the right environment for wild yeast to flourish.',
                  },
                ],
              },
            ],
          },
        },
        category: createdCategories[0].id, // Recipes
        author: author.id,
        status: 'published',
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
        readingTime: 5,
        tags: [{ tag: 'sourdough' }, { tag: 'bread' }, { tag: 'starter' }],
      },
      {
        title: 'Essential Kitchen Tools for Home Bakers',
        slug: 'essential-kitchen-tools-home-bakers',
        excerpt:
          'Discover the must-have tools that every home baker needs for success in the kitchen.',
        content: {
          root: {
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: "Whether you're just starting your baking journey or looking to upgrade your kitchen, having the right tools makes all the difference.",
                  },
                ],
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [
                  {
                    type: 'text',
                    text: 'The Basics',
                  },
                ],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Start with these fundamental tools that will serve you well in most baking projects.',
                  },
                ],
              },
            ],
          },
        },
        category: createdCategories[2].id, // Kitchen Tools
        author: author.id,
        status: 'published',
        publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        readingTime: 7,
        tags: [{ tag: 'tools' }, { tag: 'equipment' }, { tag: 'baking' }],
      },
      {
        title: "Long-Term Food Storage: A Beginner's Guide",
        slug: 'long-term-food-storage-beginners-guide',
        excerpt:
          'Learn the fundamentals of preserving food for long-term storage and emergency preparedness.',
        content: {
          root: {
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Food storage is an essential skill for anyone looking to reduce waste, save money, and be prepared for emergencies.',
                  },
                ],
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [
                  {
                    type: 'text',
                    text: 'Storage Methods',
                  },
                ],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'There are several effective methods for long-term food preservation, each with its own advantages.',
                  },
                ],
              },
            ],
          },
        },
        category: createdCategories[3].id, // Food Storage
        author: author.id,
        status: 'published',
        publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        readingTime: 10,
        tags: [{ tag: 'storage' }, { tag: 'preservation' }, { tag: 'emergency prep' }],
      },
    ]

    for (const post of posts) {
      const created = await payload.create({
        collection: 'posts',
        data: post,
      })
      console.log(`✅ Created post: ${post.title}`)
    }

    console.log('🎉 Blog seed completed successfully!')
  } catch (error) {
    console.error('❌ Error seeding blog:', error)
  }
}

seed()
