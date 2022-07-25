import { formatDateProperty } from '@adminjs/design-system'
import { PropertyType } from '@adminjs/common/interfaces'

export default (value: Date, propertyType: PropertyType): string => {
  if (!value) {
    return ''
  }
  const date = new Date(value)
  if (date) {
    return formatDateProperty(date, propertyType)
  }
  return ''
}
