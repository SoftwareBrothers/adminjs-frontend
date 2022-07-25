import { ActionJSON } from '@adminjs/common/interfaces'

export const actionHasComponent = (action: ActionJSON): boolean => (
  typeof action.component !== 'undefined' && action.component === false
)
