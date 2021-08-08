import React from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import Navbar from '../Navbar'
import { FaCartPlus } from 'react-icons/fa'

import ClientRouteUrls from '@/ReactRouter/ClientRouteUrls'

export const StoreWelcomes = () => {

  return (
    <div>
      <Navbar />
      <h2>Welcome to the Store!</h2>
      <Link to='/cart'><FaCartPlus /></Link>
      <main>
        <Switch>
          {ClientRouteUrls.map((routeArg, idxArg) => {
            return (
              routeArg.component && (
                <Route
                  key={idxArg}
                  path={routeArg.path} //const routes = [{path:,}]
                  exact={routeArg.exact} //const routes = [{exact:,}]
                  name={routeArg.name} //const routes = [{name:,}]
                  render={
                    (props) => <routeArg.component {...props} />
                    //const routes = [{component:,}]
                  }
                />
              )
            )
          })}
          <Redirect from="/store" to="/store/categories" />
        </Switch>
      </main>
    </div>
  )
}
