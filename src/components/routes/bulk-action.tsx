import { ActionJSON, RecordJSON, ResourceJSON } from '@adminjs/common/interfaces'
import { BulkActionParams } from '@adminjs/common/utils'
import { Loader } from '@adminjs/design-system'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import getBulkActionsFromRecords from '../app/records-table/utils/get-bulk-actions-from-records'

import { useNotice, useResource, useTranslation } from '../../hooks'
import {
  ActionHeader, BaseActionComponent, DrawerPortal, ErrorMessageBox, NoActionError, NoResourceError,
} from '../app'
import Wrapper from './utils/wrapper'

import { ApiContext } from '../../api-context'

type PropsFromState = {
  resources: Array<ResourceJSON>;
}

type MatchParams = Pick<BulkActionParams, 'actionName' | 'resourceId'>

const BulkAction: React.FC = () => {
  const api = useContext(ApiContext)
  const params = useParams()
  const [records, setRecords] = useState<Array<RecordJSON>>([])
  const [loading, setLoading] = useState(false)
  const { translateMessage } = useTranslation()
  const addNotice = useNotice()
  const location = useLocation()

  const { resourceId, actionName } = params
  const resource = useResource(resourceId)

  const fetchRecords = (): Promise<void> => {
    const recordIdsString = new URLSearchParams(location.search).get('recordIds')
    const recordIds = recordIdsString ? recordIdsString.split(',') : []
    setLoading(true)

    return api.bulkAction({
      resourceId, recordIds, actionName,
    }).then((response) => {
      setLoading(false)
      setRecords(response.data.records)
    }).catch((error) => {
      setLoading(false)
      addNotice({
        message: translateMessage('errorFetchingRecords', resourceId),
        type: 'error',
      })
      throw error
    })
  }

  useEffect(() => {
    fetchRecords()
  }, [params.resourceId, params.actionName])

  if (!resource) {
    return (<NoResourceError resourceId={resourceId} />)
  }

  if (!records && !loading) {
    return (
      <ErrorMessageBox title="No records">
        <p>{translateMessage('noRecordsSelected', resourceId)}</p>
      </ErrorMessageBox>
    )
  }
  const action = getBulkActionsFromRecords(records || []).find((r) => r.name === actionName)

  if (loading) {
    const actionFromResource = resource.actions.find((r) => r.name === actionName)
    return actionFromResource?.showInDrawer ? (<DrawerPortal><Loader /></DrawerPortal>) : <Loader />
  }

  if (!action) {
    return (<NoActionError resourceId={resourceId} actionName={actionName} />)
  }

  if (action.showInDrawer) {
    return (
      <DrawerPortal width={action.containerWidth}>
        <BaseActionComponent
          action={action as ActionJSON}
          resource={resource}
          records={records}
        />
      </DrawerPortal>
    )
  }

  return (
    <Wrapper width={action.containerWidth}>
      {!action?.showInDrawer ? (
        <ActionHeader
          resource={resource}
          action={action}
        />
      ) : ''}
      <BaseActionComponent
        action={action as ActionJSON}
        resource={resource}
        records={records}
      />
    </Wrapper>
  )
}

export default BulkAction
