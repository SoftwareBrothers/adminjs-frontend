import React, { FunctionComponent, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import DefaultDashboard from '../app/default-dashboard'
import ErrorBoundary from '../app/error-boundary'
import { ReduxState, DashboardInState } from '../../store/store'

declare const AdminJS: {
  UserComponents: Record<string, FunctionComponent>;
}

const Dashboard: React.FC = () => {
  const [isClient, setIsClient] = useState(false)
  const dashboard = useSelector<ReduxState, DashboardInState>((state) => state.dashboard)

  useEffect(() => {
    setIsClient(true)
  }, [])

  let Component
  if (dashboard && dashboard.component && isClient
      && AdminJS.UserComponents[dashboard.component]
  ) {
    Component = AdminJS.UserComponents[dashboard.component] as FunctionComponent
  } else {
    Component = DefaultDashboard
  }

  return (
    <ErrorBoundary>
      <Component />
    </ErrorBoundary>
  )
}

export default Dashboard
