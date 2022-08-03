import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useParams, RouteComponentProps } from 'react-router-dom'

import { ResourceJSON } from '@adminjs/common/interfaces'
import { ResourceActionParams } from '@adminjs/common/utils'
import BaseActionComponent from '../app/base-action-component'

import { ReduxState } from '../../store/store'
import { NoResourceError, NoActionError } from '../app/error-message'
import { ActionHeader } from '../app'
import Wrapper from './utils/wrapper'
import DrawerPortal from '../app/drawer-portal'
import FilterDrawer from '../app/filter-drawer'

type PropsFromState = {
  resources: Array<ResourceJSON>;
}

type Props = PropsFromState & RouteComponentProps<ResourceActionParams>

const ResourceAction: React.FC<Props> = (props) => {
  const params = useParams()
  const { resources } = props
  const { resourceId, actionName } = params
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
          toggleFilter={toggleFilter!}
        />
      ) : ''}
    </Wrapper>
  )
}

const mapStateToProps = (state: ReduxState): PropsFromState => ({
  resources: state.resources,
})

export default connect(mapStateToProps)(ResourceAction)
