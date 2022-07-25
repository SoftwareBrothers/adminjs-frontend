import { ActionJSON } from '@adminjs/common/interfaces'

export const buildActionTestId = (action: ActionJSON): string => `action-${action.name}`
