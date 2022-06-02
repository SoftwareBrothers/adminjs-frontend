import React from 'react'

import ReferenceValue from './reference-value'
import { EditPropertyProps } from '../base-property-props'

const List: React.FC<EditPropertyProps> = (props) => {
  const { property, record } = props

  return (
    <ReferenceValue
      property={property}
      record={record}
    />
  )
}

export default List
