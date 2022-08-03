import React, { PureComponent, ReactChild } from 'react'
import { RecordJSON, PropertyJSON } from '@adminjs/common/interfaces'
import formatValue from './format-value'

interface Props {
  property: PropertyJSON;
  record: RecordJSON;
}

export default class List extends PureComponent<Props> {
  render(): ReactChild {
    const { property, record } = this.props
    const value = formatValue(record.params[property.path], property.props)

    return <span>{value}</span>
  }
}
