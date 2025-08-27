import type { Metadata } from 'next'
import { Inter, Libre_Baskerville } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-libre-baskerville',
})

export const metadata: Metadata = {
  title: 'Kitchen Kneads - Premium Kitchen Supplies & Scratch Cooking',
  description:
    'Discover premium kitchen supplies, scratch cooking essentials, and artisanal ingredients. From farm to table cooking solutions.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${libreBaskerville.variable}`}>{children}</body>
    </html>
  )
}
