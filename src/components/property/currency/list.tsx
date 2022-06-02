import React from 'react'

import formatValue from './format-value'
import { RecordJSON, PropertyJSON } from '../../../interfaces'

interface Props {
  property: PropertyJSON;
  record: RecordJSON;
}

const List: React.FC<Props> = (props) => {
  const { property, record } = props
  const value = formatValue(record.params[property.path], property.props)

  return <span>{value}</span>
}

export default List
