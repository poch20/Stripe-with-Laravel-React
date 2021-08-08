import React from 'react'
import { Link, useHistory } from 'react-router-dom'

// My NPM Libraries
import Swal from 'sweetalert2'

function Navbar() {
  const history = useHistory()
  const eventRClick__buttonLogOut = (e) => {
    /*Invalid hook call. Hooks can only be called inside of the body of a function component.*/
    e.preventDefault()
    // after clicking the button it will call this API as a request and gives back a response data
    axios.post('/api/sanctum-logout').then((res) => {
      if (res.data.status === 200) {
        console.log(res.data)
        localStorage.removeItem('auth_token_received_from_sanctum')
        localStorage.removeItem('auth_name_received_from_sanctum')
        console.log('res.data is an objLitNotation =>', res.data)
        Swal.fire('Success', res.data.message, 'success'), history.push('/')
        const timer = setTimeout(() => window.location.reload(false), 3000)
        return () => clearTimeout(timer)
      }
    })
  }

  let AuthButtons = ''
  if (!localStorage.getItem('auth_token_received_from_sanctum')) {
    AuthButtons = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
      </ul>
    )
  } else {
    AuthButtons = (
      <li className="nav-item">
        <button
          type="button"
          className="nav-link btn btn-danger btn-sm text-white"
          onClick={eventRClick__buttonLogOut}
        >
          Logout
        </button>
      </li>
    )
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/store">
          Store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="#">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Collection
              </Link>
            </li>
            {AuthButtons}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
