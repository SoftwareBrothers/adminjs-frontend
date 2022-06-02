import React from 'react'
import { ValueGroup } from '@adminjs/design-system'

import ReferenceValue from './reference-value'
import { ShowPropertyProps } from '../base-property-props'

const Show: React.FC<ShowPropertyProps> = (props) => {
  const { property, record } = props

  return (
    <ValueGroup label={property.label}>
      <ReferenceValue
        property={property}
        record={record}
      />
    </ValueGroup>
  )
}

export default Show
