import React, { useState } from 'react'
import { FormGroup, Label, SelectAsync } from '@adminjs/design-system'

import ApiClient from '../../../utils/api-client/api-client'
import { FilterPropertyProps, SelectRecord } from '../base-property-props'

type CombinedProps = FilterPropertyProps

const Filter: React.FC<CombinedProps> = (props) => {
  const { onChange, property, filter } = props
  const api = new ApiClient()
  const [options, setOptions] = useState<SelectRecord[]>([])

  const handleChange = (selected: SelectRecord) => {
    onChange(property.path, selected ? selected.value : '')
  }

  const loadOptions = async (inputValue: string): Promise<Array<{value: string; label: string }>> => {
    const records = await api.searchRecords({
      resourceId: property.reference as string,
      query: inputValue,
    })
    const newOptions = records.map((r) => ({ value: r.id, label: r.title }))
    setOptions(newOptions)

    return newOptions
  }

  const value = typeof filter[property.path] === 'undefined' ? '' : filter[property.path]
  const selected = (options || []).find((o) => o.value === value)

  return (
    <FormGroup>
      <Label>{property.label}</Label>
      <SelectAsync
        variant="filter"
        value={typeof selected === 'undefined' ? '' : selected}
        isClearable
        cacheOptions
        loadOptions={loadOptions}
        onChange={handleChange}
        defaultOptions
      />
    </FormGroup>
  )
}

export default Filter
