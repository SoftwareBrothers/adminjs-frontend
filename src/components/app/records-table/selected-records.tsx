import React, { useContext } from 'react'
import { TableCaption, Title, ButtonGroup, Box } from '@adminjs/design-system'
import { useNavigate } from 'react-router-dom'
import { ActionJSON, RecordJSON, ResourceJSON } from '@adminjs/common/interfaces'
import { buildActionClickHandler } from '../../../interfaces'
import getBulkActionsFromRecords from './utils/get-bulk-actions-from-records'
import { useActionResponseHandler, useTranslation } from '../../../hooks'
import { actionsToButtonGroup } from '../action-header/actions-to-button-group'
import { ApiContext } from '../../../api-context'

type SelectedRecordsProps = {
  resource: ResourceJSON;
  selectedRecords?: Array<RecordJSON>;
}

export const SelectedRecords: React.FC<SelectedRecordsProps> = (props) => {
  const { resource, selectedRecords } = props
  const api = useContext(ApiContext)
  const { translateLabel } = useTranslation()
  const navigate = useNavigate()
  const actionResponseHandler = useActionResponseHandler()

  if (!selectedRecords || !selectedRecords.length) {
    return null
  }

  const params = { resourceId: resource.id, recordIds: selectedRecords.map((records) => records.id) }

  const handleActionClick = (event, sourceAction: ActionJSON): void => (
    buildActionClickHandler({
      action: sourceAction,
      params,
      actionResponseHandler,
      push: navigate,
      api,
    })(event)
  )

  const bulkButtons = actionsToButtonGroup({
    actions: getBulkActionsFromRecords(selectedRecords),
    params,
    handleClick: handleActionClick,
  })

  return (
    <TableCaption>
      <Box flex py="sm" alignItems="center">
        <Title mr="lg">
          {translateLabel('selectedRecords', resource.id, { selected: selectedRecords.length })}
        </Title>
        <ButtonGroup size="sm" rounded buttons={bulkButtons} />
      </Box>
    </TableCaption>
  )
}

export default SelectedRecords
