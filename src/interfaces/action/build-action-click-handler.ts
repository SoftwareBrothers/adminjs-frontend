/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
import { DifferentActionParams, useActionResponseHandler } from '../../hooks'
import { actionHasComponent } from './action-has-component'
import { actionHref } from './action-href'
import { ActionJSON } from '@adminjs/common/interfaces'
import { buildActionCallApiTrigger } from './build-action-api-call-trigger'

export type BuildActionClickOptions = {
  action: ActionJSON;
  params: DifferentActionParams;
  actionResponseHandler: ReturnType<typeof useActionResponseHandler>;
  push: (path: string, state?: any) => void;
  api: any;
}

export type BuildActionClickReturn = (event: any) => any | Promise<any>

export const buildActionClickHandler = (
  options: BuildActionClickOptions,
): BuildActionClickReturn => {
  const { action, params, actionResponseHandler, push, api } = options
  const handleActionClick = (event: React.MouseEvent<HTMLElement>): Promise<any> | any => {
    event.preventDefault()
    event.stopPropagation()

    const href = actionHref(action, params)

    const callApi = buildActionCallApiTrigger({
      params, action, actionResponseHandler, api
    })

    if (action.guard && !confirm(action.guard)) {
      return
    }

    if (actionHasComponent(action)) {
      // eslint-disable-next-line consistent-return
      return callApi()
    }

    if (href) {
      push(href)
    }
  }

  return handleActionClick
}
