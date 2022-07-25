/* eslint-disable @typescript-eslint/explicit-function-return-type */
//JMW
//import { useHistory, useLocation } from 'react-router'
import { useNavigate, useLocation } from 'react-router-dom'
//import { ActionResponse } from '../../../backend/actions/action.interface'
import { ActionResponse } from '@adminjs/common/interfaces'
import { appendForceRefresh } from '../../components/actions/utils/append-force-refresh'
import { ActionCallCallback } from '.'
import { useNotice } from '../use-notice'


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
