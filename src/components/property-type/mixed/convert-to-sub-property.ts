//import { BasePropertyJSON, PropertyJSON } from '../../../interfaces'
import { BasePropertyJSON, PropertyJSON  } from '@adminjs/common/interfaces'
//import { DELIMITER } from './../../../utils_/flat/constants'
import { DELIMITER } from '@adminjs/common'


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
