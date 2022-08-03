import { RecordActionParams } from '@adminjs/common/utils'
import { ActionJSON } from '..'
import { DifferentActionParams } from '../../hooks/use-action/use-action.types'

export const isRecordAction = (
  params: DifferentActionParams,
  action: ActionJSON,
): params is RecordActionParams => (
  'recordId' in params && action.actionType === 'record'
)
