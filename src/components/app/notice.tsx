import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MessageBox } from '@adminjs/design-system'

import { NoticeMessageInState, ReduxState } from '../../store/store'
import { dropNotice } from '../../store/actions/drop-notice'
import { setNoticeProgress } from '../../store/actions/set-notice-progress'

const TIME_TO_DISAPPEAR = 3

export type NotifyProgress = (options: {
  noticeId: string; progress: number;
}) => void

export type NoticeElementProps = {
  notice: NoticeMessageInState;
  drop: () => void;
  notifyProgress: NotifyProgress;
}

export type NoticeElementState = {
  progress: number;
}

export const NoticeElement: React.FC<NoticeElementProps> = (props) => {
  let timer
  const { notice, drop, notifyProgress } = props

  const [progress, setProgress] = useState(notice.progress || 0)

  useEffect(() => {
    timer = setInterval(() => {
      const newProgress = progress + 100 / TIME_TO_DISAPPEAR
      notifyProgress({ noticeId: notice.id, progress })
      setProgress(newProgress)
    }, 1000)

    setTimeout(() => {
      if (timer) {
        clearInterval(timer)
      }
      drop()
    }, 1000 * (TIME_TO_DISAPPEAR + 1))

    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [])

  return (
    <MessageBox
      style={{ minWidth: '480px' }}
      message={notice.message}
      variant={notice.type === 'success' ? 'success' : 'danger'}
      onCloseClick={drop}
    />
  )
}

const NoticeBox: React.FC = () => {
  const notices = useSelector<ReduxState, Array<NoticeMessageInState>>((state) => state.notices)
  const dispatch = useDispatch()
  const notice = notices.length ? notices[notices.length - 1] : null

  const drop = () => {
    if (notice) {
      dispatch(dropNotice(notice.id))
    }
  }

  const notifyProgress = (progress) => {
    if (notice) {
      dispatch(setNoticeProgress({ noticeId: notice.id, progress }))
    }
  }

  if (notice) {
    return (
      <div data-testid="notice-wrapper">
        <NoticeElement
          key={notice.id}
          notice={notice}
          drop={drop}
          notifyProgress={notifyProgress}
        />
      </div>
    )
  }

  return (
    <div />
  )
}

export {
  NoticeBox as default,
  NoticeBox,
}
