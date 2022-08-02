import { FormGroup, Label, SelectAsync } from '@adminjs/design-system'
import React, { ReactNode } from 'react'

import ApiClient from '../../../utils/api-client'
import { FilterPropertyProps, SelectRecord } from '../base-property-props'

import { ApiContext } from '../../../api-context'

type CombinedProps = FilterPropertyProps

class Filter extends React.PureComponent<CombinedProps> {
  private api: ApiClient

  private options: Array<SelectRecord>
    
  static contextType = ApiContext;

  constructor(props: CombinedProps) {
    super(props)
    this.options = []
    this.loadOptions = this.loadOptions.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(selected: SelectRecord): void {
    const { onChange, property } = this.props
    onChange(property.path, selected ? selected.value : '')
  }

  async loadOptions(inputValue: string): Promise<Array<{value: string; label: string }>> {
    const { property } = this.props
    const records = await this.api.searchRecords({
      resourceId: property.reference as string,
      query: inputValue,
    })
    this.options = records.map(r => ({ value: r.id, label: r.title }))
    return this.options
  }

  render(): ReactNode {
    this.api = this.context
    const { property, filter } = this.props
    const value = typeof filter[property.path] === 'undefined' ? '' : filter[property.path]
    const selected = (this.options || []).find(o => o.value === value)
    return (
      <FormGroup>
        <Label>{property.label}</Label>
        <SelectAsync
          variant="filter"
          value={typeof selected === 'undefined' ? '' : selected}
          isClearable
          cacheOptions
          loadOptions={this.loadOptions}
          onChange={this.handleChange}
          defaultOptions
        />
      </FormGroup>
    )
  }
}

export default Filter
