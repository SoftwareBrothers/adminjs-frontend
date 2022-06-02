import React, { FunctionComponent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

import ErrorBoundary from '../app/error-boundary'
import { ReduxState } from '../../store/store'
import ErrorMessageBox from '../app/error-message'
import { PageJSON } from '../../interfaces'

declare const AdminJS: {
  UserComponents: Record<string, FunctionComponent>;
}

const Page: React.FC = () => {
  const [isClient, setIsClient] = useState(false)
  const pages = useSelector<ReduxState, PageJSON[]>((state) => state.pages)
  const params = useParams()
  const { pageName } = params

  useEffect(() => {
    setIsClient(true)
  }, [])

  const currentPage = pages.find((page) => page.name === pageName)

  if (!currentPage) {
    return (
      <ErrorMessageBox title="There is no page of given name">
        <p>
          Page:
          <b>{` "${pageName}" `}</b>
          does not exist.
        </p>
      </ErrorMessageBox>
    )
  }

  const Component = AdminJS.UserComponents[currentPage.component]

  if (!Component || !isClient) {
    return (
      <ErrorMessageBox title="No component specified">
        <p>You have to specify component which will render this Page</p>
      </ErrorMessageBox>
    )
  }

  return (
    <ErrorBoundary>
      <Component />
    </ErrorBoundary>
  )
}

export default Page
