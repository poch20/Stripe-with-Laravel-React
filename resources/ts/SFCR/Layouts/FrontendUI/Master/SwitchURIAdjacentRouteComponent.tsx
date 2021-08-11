import { Switch, Route } from 'react-router-dom'

// Import React Router
import PublicStatic from '@/ReactRouter/PublicStatic'

import Navbar from '../Navbar'

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
        </Switch>
      </div>
    </div>
  )
}

export default SwitchCascadingRoutesBasedOnParent
