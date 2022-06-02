import React from 'react'

import { RecordJSON, ResourceJSON, PropertyJSON } from '../../../interfaces'
import DefaultPropertyValue from './default-property-value'

interface Props {
  property: PropertyJSON;
  record: RecordJSON;
  resource: ResourceJSON;
}

const List: React.FC<Props> = (props) => (<DefaultPropertyValue {...props} />)

export default List
