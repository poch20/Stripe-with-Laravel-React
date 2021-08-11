import { Switch, Route, Redirect } from 'react-router-dom'

// Import React Router
import PublicStatic from '@/ReactRouter/PublicStatic'

import Navbar from '../Navbar'
import Register from '@/SFCR/layouts/FrontendUI/Auth/Register'
import Login from '@/SFCR/layouts/FrontendUI/Auth/Login'
const SwitchCascadingRoutesBasedOnParent = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Switch>
          {PublicStatic.map((arrItems, index) => {
            return (
              arrItems.component && (
                <Route
                  key={index}
                  path={arrItems.path}
                  exact={arrItems.exact}
                  name={arrItems.name}
                  render={(props) => <arrItems.component {...props} />}
                />
              )
            )
          })}
          <Route path="/login" name="AboutRouteURI">
            {localStorage.getItem('auth_token_received_from_sanctum') ? (
              <Redirect to="/" />
            ) : (
              <Login />
            )}
          </Route>
          <Route path="/register" name="ContactRouteURI">
            {localStorage.getItem('auth_token_received_from_sanctum') ? (
              <Redirect to="/" />
            ) : (
              <Register />
            )}
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default SwitchCascadingRoutesBasedOnParent
