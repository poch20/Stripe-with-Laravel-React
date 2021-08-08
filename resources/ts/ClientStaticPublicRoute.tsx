import React from 'react'
import { Route } from 'react-router-dom'

import Home from '@/SFCR/Layouts/Frontend/Master/Home'

function ClientPublicRoute({ ...rest }) {
  return <Route {...rest} render={(props) => <Home {...props} />} />
}

export default ClientPublicRoute
