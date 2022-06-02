import React from 'react'
import { ValueGroup } from '@adminjs/design-system'

import BooleanPropertyValue from './boolean-property-value'
import { ShowPropertyProps } from '../base-property-props'

const Show: React.FC<ShowPropertyProps> = (props) => {
  const { property } = props

  return (
    <ValueGroup label={property.label}>
      <BooleanPropertyValue {...props} />
    </ValueGroup>
  )
}

export default Show
