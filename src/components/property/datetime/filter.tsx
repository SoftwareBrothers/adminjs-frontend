import React from 'react'
import { FormGroup, Label, DatePicker } from '@adminjs/design-system'
import { PARAM_SEPARATOR } from '@adminjs/common/constants'

import { useTranslation } from '../../../hooks/use-translation'
import { FilterPropertyProps } from '../base-property-props'

const Filter: React.FC<FilterPropertyProps> = (props) => {
  const { property, filter, onChange } = props
  const { translateProperty } = useTranslation()

  const fromKey = `${property.path}${PARAM_SEPARATOR}from`
  const toKey = `${property.path}${PARAM_SEPARATOR}to`
  const fromValue = filter[fromKey]
  const toValue = filter[toKey]

  return (
    <FormGroup variant="filter">
      <Label>{property.label}</Label>
      <Label>{`- ${translateProperty('from')}: `}</Label>
      <DatePicker
        value={fromValue}
        onChange={(date): void => onChange(fromKey, date)}
        propertyType={property.type}
      />
      <Label mt="default">{`- ${translateProperty('to')}: `}</Label>
      <DatePicker
        value={toValue}
        onChange={(date): void => onChange(toKey, date)}
        propertyType={property.type}
      />
    </FormGroup>
  )
}

export default Filter
