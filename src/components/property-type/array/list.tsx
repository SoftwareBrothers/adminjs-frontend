import React from 'react'
import { PropertyJSON, RecordJSON, ResourceJSON } from '@adminjs/common/interfaces'
import { flat } from '@adminjs/common/utils'
import { useTranslation } from '../../../hooks/use-translation'

import { ShowPropertyProps } from '../base-property-props'

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
