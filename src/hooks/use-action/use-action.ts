import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ActionResponse, ActionJSON } from '@adminjs/common/interfaces'

import { buildActionCallApiTrigger, buildActionClickHandler } from '../../interfaces'

import { DifferentActionParams, ActionCallCallback, UseActionResult } from './use-action.types'
import { actionHref } from '../../interfaces/action/action-href'
import { useActionResponseHandler } from './use-action-response-handler'
import { ApiContext } from '../../api-context'

/**
 * @load ./use-action.doc.md
 * @subcategory Hooks
 *
 * @param {ActionJSON}   action      action object
 * @param {ActionParams} params
 * @param {ActionCallCallback} onActionCall - callback triggered when action is performed
 * @return {UseActionResult}
 * @new In version 3.3
 * @class
 * @hideconstructor
 */
export function useAction<K extends ActionResponse>(
  action: ActionJSON,
  params: DifferentActionParams,
  onActionCall?: ActionCallCallback,
): UseActionResult<K> {
  const navigate = useNavigate()
  const api = useContext(ApiContext)
  const actionResponseHandler = useActionResponseHandler(onActionCall)

  const href = actionHref(action, params)

  const callApi = buildActionCallApiTrigger<K>({
    action,
    params,
    actionResponseHandler,
    api,
  })

  const handleClick = buildActionClickHandler({
    action,
    params,
    actionResponseHandler,
    push: navigate,
    api,
  })

  return {
    href,
    callApi,
    handleClick,
  }
}
