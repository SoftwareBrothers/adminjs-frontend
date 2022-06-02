import React from 'react'

import mapValue from './map-value'
import { RecordJSON, PropertyJSON } from '../../../interfaces'

interface Props {
  property: PropertyJSON;
  record: RecordJSON;
}

const List: React.FC<Props> = (props) => {
  const { property, record } = props
  const value = mapValue(record.params[property.path], property.type)

  return (
    <span>{value}</span>
  )
}

export default List
