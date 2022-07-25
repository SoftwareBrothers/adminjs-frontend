import React from 'react'

import { useTranslation } from '../../../hooks/use-translation'
//import { PropertyJSON, RecordJSON, ResourceJSON } from '../../../interfaces'
import { PropertyJSON, RecordJSON, ResourceJSON } from '@adminjs/common/interfaces'

import { ShowPropertyProps } from '../base-property-props'
//import { flat } from './../../../utils_'
import { flat } from '@adminjs/common'

interface Props {
  property: PropertyJSON;
  record: RecordJSON;
  resource: ResourceJSON;
}

const List: React.FC<ShowPropertyProps> = (props) => {
  const { property, record } = props
  const values = flat.get(record.params, property.path) || []
  const { translateProperty } = useTranslation()

  return (
    <span>{`${translateProperty('length')}: ${values.length}`}</span>
  )
}

export default List
