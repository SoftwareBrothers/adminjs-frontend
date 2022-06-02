import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

import BaseActionComponent from '../app/base-action-component'
import { ResourceJSON } from '../../interfaces'
import { ReduxState } from '../../store/store'
import { ResourceActionParams } from '../../utils/view-helpers'
import { NoResourceError, NoActionError } from '../app/error-message'
import { ActionHeader } from '../app'
import Wrapper from './utils/wrapper'
import DrawerPortal from '../app/drawer-portal'
import FilterDrawer from '../app/filter-drawer'

const ResourceAction: React.FC = () => {
  const resources = useSelector<ReduxState, ResourceJSON[]>((state) => state.resources)
  const params = useParams<ResourceActionParams>()
  const { resourceId = '', actionName = '' } = params
  const [filterVisible, setFilterVisible] = useState(false)
  const [tag, setTag] = useState('')

  const resource = resources.find((r) => r.id === resourceId)
  if (!resource) {
    return (<NoResourceError resourceId={resourceId} />)
  }
  const action = resource.resourceActions.find((r) => r.name === actionName)
  if (!action) {
    return (<NoActionError resourceId={resourceId} actionName={actionName} />)
  }

  const toggleFilter = action.showFilter
    ? ((): void => setFilterVisible(!filterVisible))
    : undefined

  if (action.showInDrawer) {
    return (
      <DrawerPortal width={action.containerWidth}>
        <BaseActionComponent
          action={action}
          resource={resource}
        />
      </DrawerPortal>
    )
  }

  return (
    <Wrapper width={action.containerWidth} showFilter={action.showFilter}>
      <ActionHeader
        resource={resource}
        action={action}
        toggleFilter={toggleFilter}
        tag={tag}
      />
      <BaseActionComponent
        action={action}
        resource={resource}
        setTag={setTag}
      />
      {action.showFilter ? (
        <FilterDrawer
          key={filterVisible.toString()}
          resource={resource}
          isVisible={filterVisible}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          toggleFilter={toggleFilter!}
        />
      ) : ''}
    </Wrapper>
  )
}

export default ResourceAction
