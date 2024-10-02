import { type SchemaTypeDefinition } from 'sanity'
import { product } from './products-schema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product],
}
