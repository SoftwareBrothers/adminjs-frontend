/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useNavigate, useLocation } from 'react-router'
import { ActionResponse } from '../../interfaces/action'
import { appendForceRefresh } from '../../components/actions/utils/append-force-refresh'
import { useNotice } from '../use-notice'
import { ActionCallCallback } from './use-action.types'

export const useActionResponseHandler = (onActionCall?: ActionCallCallback) => {
  const location = useLocation()
  const navigate = useNavigate()
  const addNotice = useNotice()

  return (response: ActionResponse) => {
    const { data } = response
    if (data.notice) {
      addNotice(data.notice)
    }
    if (data.redirectUrl && location.pathname !== data.redirectUrl) {
      const appended = appendForceRefresh(data.redirectUrl)
      navigate(appended)
    }
    if (onActionCall) {
      onActionCall(data)
    }
  }
}
