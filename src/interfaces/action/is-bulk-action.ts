import { BulkActionParams } from '@adminjs/common/utils'
import { ActionJSON } from '@adminjs/common/interfaces'
import { DifferentActionParams } from '../../hooks/use-action/use-action.types'

export const isBulkAction = (
  params: DifferentActionParams,
  action: ActionJSON,
): params is BulkActionParams => 'recordIds' in params && action.actionType === 'bulk'
