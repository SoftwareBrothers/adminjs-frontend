import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

type WithRouterProps = {
  props?: any;
}

const withRouter = (Component) => {
  
  const ComponentWithRouterProp: React.FC<WithRouterProps> = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()

    return <Component {...props} router={{ location, navigate, params }} />
  }

  return ComponentWithRouterProp
  
}

export default withRouter