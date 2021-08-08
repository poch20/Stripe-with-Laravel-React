import React, { useState, useEffect } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'

// My SFC
import MasterLayout from '@/SFCR/layouts/BackendUI/MasterLayouts'

// My NPM Package Libraries
import axios from 'axios'
import Swal from 'sweetalert2'

function AdminPrivateRoute({ ...rest }) {
  const history = useHistory()
  const [Authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)




  useEffect(() => {
    axios.get('/api/checkingAuthenticated').then((res) => {
      if (res.status === 200) {
        setAuthenticated(true)
      }
      setLoading(false)
    })
    return () => {
      setAuthenticated(false)
    }
  }, [])



  axios.interceptors.response.use(
    undefined,
    function axiosRetryInterceptor(err) {
      if (err.response.status === 401) {
        console.log(err.response.data)

        Swal.fire('Unauthorized', err.response.data.message, 'warning'),
          history.push('/')
      }
      return Promise.reject(err)
    }
  )

  axios.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      if (error.response.status === 403) {
        // Access Denied
        Swal.fire('Forbidden', error.response.data.message, 'warning'),
          history.push('/403')
      } else if (error.response.status === 404) {
        // Page Not Found
        Swal.fire('404 Error', 'Hindi Nakita ang Page', 'warning'),
          history.push('/404')
      }
      return Promise.reject(error)
    }
  )

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <Route
      {...rest}
      render={({ props, location }) =>
        Authenticated ? (
          <MasterLayout {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  )
}

export default AdminPrivateRoute
