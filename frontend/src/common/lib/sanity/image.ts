// src/common/lib/sanity/image.ts
import imageUrlBuilder from '@sanity/image-url'
import { getSanityClient } from './sanity-client'

const client = getSanityClient()
export const urlFor = (source: any) => imageUrlBuilder(client).image(source)