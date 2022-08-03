import { BasePropertyJSON, PropertyJSON } from '@adminjs/common/interfaces'
import { DELIMITER } from '@adminjs/common/constants'

export function convertToSubProperty(
  property: PropertyJSON,
  subProperty: BasePropertyJSON,
): PropertyJSON {
  const [subPropertyPath] = subProperty.name.split(DELIMITER).slice(-1)
  return {
    ...subProperty,
    path: [property.path, subPropertyPath].join(DELIMITER),
  }
}
