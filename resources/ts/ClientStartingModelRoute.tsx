import React from 'react'
import { Route } from 'react-router-dom'

import SwitchURIAdjacentRouteComponent from '@/SFCR/Layouts/FrontendUI/Master/SwitchURIAdjacentRouteComponent'

function ClientStartingModelRoute({ ...rest }) {
  return <Route {...rest} render={(props) => <SwitchURIAdjacentRouteComponent {...props} />} />
}

export default ClientStartingModelRoute
