import { DatePicker, FormGroup, Label } from '@adminjs/design-system'
import React from 'react'
import { useTranslation } from '../../../hooks/use-translation'
import { FilterPropertyProps } from '../base-property-props'
//import * as BackendFilter from '../../../backend/utils/filter/filter'
// const { PARAM_SEPARATOR } = BackendFilter
import { PARAM_SEPARATOR } from '@adminjs/common/constants'


const Filter: React.FC<FilterPropertyProps> = (props) => {
  const { property, filter, onChange } = props
  const { translateProperty } = useTranslation()

  const fromKey = `${property.path}${PARAM_SEPARATOR}from`
  const toKey = `${property.path}${PARAM_SEPARATOR}to`
  const fromValue = filter[fromKey]
  const toValue = filter[toKey]

  return (
    <React.Fragment>
      <FormGroup variant="filter">
        <Label>{property.label}</Label>
        <Label>{`- ${translateProperty('from')}: `}</Label>
        <DatePicker
          value={fromValue}
          onChange={date => onChange(fromKey, date)}
          propertyType={property.type}
        />
        <Label mt="default">{`- ${translateProperty('to')}: `}</Label>
        <DatePicker
          value={toValue}
          onChange={date => onChange(toKey, date)}
          propertyType={property.type}
        />
      </FormGroup>
    </React.Fragment>
  )
}

export default Filter
