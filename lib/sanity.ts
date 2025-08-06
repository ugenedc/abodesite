import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion, isSanityConfigured } from '@/sanity/env'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

export { isSanityConfigured } 