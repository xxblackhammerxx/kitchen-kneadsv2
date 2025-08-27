import configPromise from '@/payload.config'
import { getPayload } from 'payload'

let cachedPayload: any = null

export default async function getPayloadClient() {
  if (cachedPayload) {
    return cachedPayload
  }

  cachedPayload = await getPayload({
    config: await configPromise,
  })

  return cachedPayload
}
