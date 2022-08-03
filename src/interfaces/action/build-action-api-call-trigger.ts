/* eslint-disable arrow-parens */
import { ActionJSON, ActionResponse } from '@adminjs/common/interfaces'
import { AxiosResponse } from 'axios'
import { DifferentActionParams, useActionResponseHandler } from '../../hooks'
import { callActionApi } from './call-action-api'

export type CallApiFunction<K extends ActionResponse> = () => Promise<AxiosResponse<K>>

export type BuildActionCallApiTriggerOptions = {
  action: ActionJSON;
  params: DifferentActionParams;
  actionResponseHandler: ReturnType<typeof useActionResponseHandler>;
  api: any;
  search?: Location['search'];
}

export const buildActionCallApiTrigger = <K>(
  options: BuildActionCallApiTriggerOptions,
): CallApiFunction<K> => {
  const { action, params, actionResponseHandler, api, search } = options
  const callApi: CallApiFunction<K> = () => {
    const promise = callActionApi(action, params, api, search)
    promise.then(actionResponseHandler).catch((error) => {
      throw error
    })

    return promise as Promise<AxiosResponse<K>>
  }
  return callApi
}
