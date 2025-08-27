'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function LeadTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Track page views
    const trackPageView = async () => {
      try {
        // You can integrate with analytics services here
        // Example: Google Analytics, Mixpanel, etc.
        console.log('Page view:', pathname)
        
        // Track UTM parameters
        const utmSource = searchParams.get('utm_source')
        const utmMedium = searchParams.get('utm_medium')
        const utmCampaign = searchParams.get('utm_campaign')
        
        if (utmSource || utmMedium || utmCampaign) {

          console.log('UTM tracking:', {
            source: utmSource,
            medium: utmMedium,
            campaign: utmCampaign,
          })
        }
      } catch (error) {
        console.error('Error tracking page view:', error)
      }
    }
    
    trackPageView()
  }, [pathname, searchParams])
  
  return null
}