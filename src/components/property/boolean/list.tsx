import React from 'react'

import { RecordJSON, PropertyJSON, ResourceJSON } from '../../../interfaces'
import BooleanPropertyValue from './boolean-property-value'

interface Props {
  property: PropertyJSON;
  record: RecordJSON;
  resource: ResourceJSON;
}

const List: React.FC<Props> = (props) => (
  <BooleanPropertyValue {...props} />
)

export default List
