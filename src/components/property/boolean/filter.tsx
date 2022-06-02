import React from 'react'
import { FormGroup, Label, Select } from '@adminjs/design-system'

import mapValue from './map-value'
import { FilterPropertyProps } from '../base-property-props'

const Filter: React.FC<FilterPropertyProps> = (props) => {
  const { onChange, property, filter = {} } = props

  const handleChange = (selected) => {
    const value = selected ? selected.value : ''
    onChange(property.path, value)
  }

  const value = typeof filter[property.path] === 'undefined' ? '' : filter[property.path]
  const options = [
    { value: true, label: mapValue(true) },
    { value: false, label: mapValue(false) },
  ]
  const selected = options.find((o) => o.value === value)

  return (
    <FormGroup>
      <Label>{property.label}</Label>
      <Select
        variant="filter"
        value={typeof selected === 'undefined' ? '' : selected}
        isClearable
        options={options}
        onChange={handleChange}
      />
    </FormGroup>
  )
}

export default Filter
