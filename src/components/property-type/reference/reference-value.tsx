import { ButtonCSS } from '@adminjs/design-system'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import ViewHelpers from '../../../backend/utils/view-helpers/view-helpers'
import { PropertyJSON, RecordJSON } from '../../../interfaces'

interface Props {
  property: PropertyJSON;
  record: RecordJSON;
}

const StyledLink = styled<any>(Link)`
  ${ButtonCSS};
  padding-left: ${({ theme }): string => theme.space.xs};
  padding-right: ${({ theme }): string => theme.space.xs};
`

const ReferenceValue: React.FC<Props> = (props) => {
  const { property, record } = props

  const h = new ViewHelpers()
  const refId = record.params[property.path]
  const populated = record.populated[property.path]
  const value = (populated && populated.title) || refId

  if (!property.reference) {
    throw new Error(`property: "${property.path}" does not have a reference`)
  }

  if (populated && populated.recordActions.find(a => a.name === 'show')) {
    const href = h.recordActionUrl({
      resourceId: property.reference, recordId: refId, actionName: 'show',
    })
    return (
      <StyledLink variant="text" to={href}>{value}</StyledLink>
    )
  }
  return (
    <span>{value}</span>
  )
}

export default ReferenceValue
