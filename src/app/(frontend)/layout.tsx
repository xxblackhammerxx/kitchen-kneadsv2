import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Kitchen Kneads - Premium Kitchen Supplies and Scratch Cooking Essentials',
  title: 'Kitchen Kneads',
}

export default async function FrontendLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <div className="frontend-layout">
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
