import { ActionJSON, ActionResponse } from '@adminjs/common/interfaces'
import { AxiosResponse } from 'axios'
import { DifferentActionParams } from '../../hooks'

export function callActionApi<K extends ActionResponse>(
  action: ActionJSON,
  params: DifferentActionParams,
  api: any,
  search?: Location['search'],

): Promise<AxiosResponse<K>> {
  let promise: Promise<AxiosResponse<K>>
  const { recordId, recordIds, resourceId } = params
  switch (action.actionType) {
  case 'record':
    if (!recordId) {
      throw new Error('You have to specify "recordId" for record action')
    }
    promise = api.recordAction({
      resourceId, actionName: action.name, recordId, search,
    }) as any
    break
  case 'resource':
    promise = api.resourceAction({
      resourceId, actionName: action.name,
    }) as any
    break
  case 'bulk':
    if (!recordIds) {
      throw new Error('You have to specify "recordIds" for bulk action')
    }
    promise = api.bulkAction({
      resourceId, actionName: action.name, recordIds, search,
    }) as any
    break
  default:
    throw new Error('"actionType" should be either record, resource or bulk')
  }
  return promise
}
