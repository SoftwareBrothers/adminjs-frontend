import { Box } from '@adminjs/design-system'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useMatch, useParams, RouteComponentProps} from 'react-router-dom'
//import { RouteComponentProps } from 'react-router'
//import { ActionJSON, ResourceJSON } from '../../interfaces'
import { ActionJSON, ResourceJSON } from '@adminjs/common/interfaces'
import { ReduxState } from '../../store/store'
import { ActionHeader } from '../app'
import BaseAction from '../app/base-action-component'
import { NoActionError, NoResourceError } from '../app/error-message'
import FilterDrawer from '../app/filter-drawer'
import { ViewHelpers, BulkActionParams, RecordActionParams, ResourceActionParams } from '@adminjs/common/utils'

type PropsFromState = {
  resources: Array<ResourceJSON>;
}

type Props = PropsFromState & RouteComponentProps<StringifiedBulk<ResourceActionParams>>

type StringifiedBulk<T> = Omit<T, 'recordsId'> & {
  recordsIds?: string;
}

const getAction = (resource: ResourceJSON): ActionJSON | undefined => {
  
  const h = new ViewHelpers()

  const resourceId = ':resourceId'
  const actionName = ':actionName'
  const recordId = ':recordId'

  const recordActionUrl = h.recordActionUrl({ resourceId, recordId, actionName })
  const resourceActionUrl = h.resourceActionUrl({ resourceId, actionName })
  const bulkActionUrl = h.bulkActionUrl({ resourceId, actionName })

  const resourceActionMatch = useMatch<ResourceActionParams>(resourceActionUrl)
  const recordActionMatch = useMatch<RecordActionParams>(recordActionUrl)
  const bulkActionMatch = useMatch<Pick<BulkActionParams, 'actionName' | 'resourceId'>>(bulkActionUrl)
  
  const action = resourceActionMatch?.params.actionName
    || recordActionMatch?.params.actionName
    || bulkActionMatch?.params.actionName

  return action ? resource.actions.find(a => a.name === action) : undefined
}

const ResourceAction: React.FC<Props> = (props) => {

  const params = useParams()
  const { resources } = props
  const { resourceId } = params

  const [filterVisible, setFilterVisible] = useState(false)
  const [tag, setTag] = useState('')

  const resource = resources.find(r => r.id === resourceId)
  if (!resource) {
    return (<NoResourceError resourceId={resourceId} />)
  }

  const realEndAction = getAction(resource)
  if (realEndAction && !realEndAction.showInDrawer) {
    return null
  }

  const listActionName = 'list'
  const listAction = resource.resourceActions.find(r => r.name === listActionName)
  if (!listAction) {
    return (<NoActionError resourceId={resourceId} actionName={listActionName} />)
  }

  const toggleFilter = listAction.showFilter
    ? ((): void => setFilterVisible(!filterVisible))
    : undefined
  console.log('listAction', listAction)
  return (
    <Box variant="grey" width={listAction.containerWidth} mx="auto">
      <ActionHeader
        resource={resource}
        action={listAction}
        tag={tag}
        toggleFilter={toggleFilter}
      />
      <BaseAction action={listAction} resource={resource} setTag={setTag} />
      
    </Box>
  )
}

const mapStateToProps = (state: ReduxState): PropsFromState => ({
  resources: state.resources,
})

export default connect(mapStateToProps)(ResourceAction)


{/* {listAction.showFilter ? (
  <FilterDrawer
    key={filterVisible.toString()}
    resource={resource}
    isVisible={filterVisible}
    toggleFilter={(): void => { setFilterVisible(!filterVisible) }}
  />
) : ''} */}
