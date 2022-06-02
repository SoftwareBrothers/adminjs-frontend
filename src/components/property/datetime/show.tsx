import React from 'react'
import { ValueGroup } from '@adminjs/design-system'

import mapValue from './map-value'
import { ShowPropertyProps } from '../base-property-props'

const Show: React.FC<ShowPropertyProps> = (props) => {
  const { property, record } = props
  const value = mapValue(record.params[property.path], property.type)

  return (
    <ValueGroup label={property.label}>
      {value}
    </ValueGroup>
  )
}

export default Show
