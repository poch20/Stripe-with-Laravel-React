import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

// My NPM Libraries
import Swal from 'sweetalert2'

import Navbar from './../Navbar'

function Login() {
  const history = useHistory()
  const [loginInput, setLogin] = useState({
    email: '',
    password: '',
    error_list: [],
  })
  const eventRChangeAttr__handleFormInputs = (e) => {
    e.persist()
    setLogin({ ...loginInput, [e.target.name]: e.target.value })
    console.log('useState firstArg registerInput ObjLit', loginInput)
    console.log('useState 2ndArg setLogin Method', setLogin)
    /* @change="eventVChangeAttr__SelectOpts"
    syntax: attributeNameTitleItself__NameOfYourChoice
    v-model="vmAttr__SelectOpts"
    name="nameAttr__InpTColCheckbox"
    @click="eventVClick__InpTColCheckbox"
    ref="refVAttr__InpTChildrenColCheckbox"
    @change="eventVChangeAttr__InpTChildrenColCheckbox($event, alias.id) */
  }

  const afterClickingLoginSubmitButton = (e) => {
    e.preventDefault()

    const getFormFieldsDataFromReactStates = {
      email: loginInput.email,
      password: loginInput.password,
    }

    axios.get('/sanctum/csrf-cookie').then((response) => {
      axios
        .post('api/sanctum-login', getFormFieldsDataFromReactStates)
        .then((res) => {
          console.log('===============______===============')
          console.log('Mga Nakiki-epal sa JSON Response natin =>', res.data)
          if (res.data.status === 200) {
            localStorage.setItem(
              'auth_token_received_from_sanctum',
              res.data.tokenFromThisResponse
            )
            localStorage.setItem(
              'auth_name_received_from_sanctum',
              res.data.username
            )
            Swal.fire('Success', res.data.message, 'success')
            // User Session Roles
            console.log('res is an base object in js', res)
            console.log(
              'res.data is an object INCEPTION Vibes  => ',
              res.data.session_role
            )

            if (res.data.session_role === 'admin') {
              history.push('/admin/dashboard')
            } else {
              history.push('/')
            }
          } else if (res.data.status === 401) {
            Swal.fire('Warning', res.data.message, 'warning')
          } else {
            setLogin({
              ...loginInput,
              error_list: res.data.validation_errors,
            })
          }
        })
    })
  }

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Login</h4>
              </div>
              <div className="card-body">
                <form onSubmit={afterClickingLoginSubmitButton}>
                  <div className="form-group mb-3">
                    <label htmlFor="">Email ID</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      onChange={eventRChangeAttr__handleFormInputs}
                      value={loginInput.email}
                    />
                    <span
                      id="after-submit-state"
                      className="bg-danger bg-gradient neonText"
                    >
                      {loginInput.error_list.email}
                    </span>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={eventRChangeAttr__handleFormInputs}
                      value={loginInput.password}
                    />
                    <span
                      id="after-submit-state"
                      className="bg-danger bg-gradient neonText"
                    >
                      {loginInput.error_list.password}
                    </span>
                  </div>
                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary">
                      Proceed
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
