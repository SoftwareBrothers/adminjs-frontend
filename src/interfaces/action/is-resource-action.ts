import { ResourceActionParams } from '@adminjs/common/utils'

import { ActionJSON } from '..'
import { DifferentActionParams } from '../../hooks/use-action/use-action.types'

export const isResourceAction = (
  params: DifferentActionParams,
  action: ActionJSON,
): params is ResourceActionParams => 'recordIds' in params && action.actionType === 'resource'
