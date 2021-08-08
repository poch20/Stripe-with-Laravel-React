import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from './../Navbar'

// My NPM Libraries
import Swal from 'sweetalert2'

function Register() {
  const history = useHistory()
  const [registerInput, setRegister] = useState({
    name: '',
    email: '',
    password: '',
    error_list: '',
  })

  const handleInput = (e) => {
    e.persist()
    setRegister({ ...registerInput, [e.target.name]: e.target.value })
    console.log('useState firstARg registerInput ObjLit', registerInput)
  }

  const registerSubmit = (e) => {
    e.preventDefault()

    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
    }

    // Axios is provided by Laravel already by default located in my libraries.tsx > require(bootstrap)
    axios.get('/sanctum/csrf-cookie').then((response) => {
      axios.post('/api/sanctum-register', data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem(
            'auth_token_received_from_sanctum',
            res.data.tokenFromThisResponse
          )
          localStorage.setItem(
            'auth_name_received_from_sanctum',
            res.data.username
          )
          Swal.fire('Success', res.data.message, 'success'), history.push('/')
        } else {
          console.log('response in JSON Format', res.data.validation_errors)
          setRegister({
            ...registerInput,
            error_list: res.data.validation_errors,
          })
          console.log('after invoke')
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
                <h4>Register</h4>
              </div>
              <div className="card-body">
                <form onSubmit={registerSubmit}>
                  <div className="form-group mb-3">
                    <label>Fullname</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      onChange={handleInput}
                      value={registerInput.name}
                    />
                    <span
                      id="after-submit-state"
                      className="bg-danger bg-gradient neonText"
                    >
                      {registerInput.error_list.name}
                    </span>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="">Email ID</label>
                    <input
                      type=""
                      name="email"
                      className="form-control"
                      onChange={handleInput}
                      value={registerInput.email}
                    />
                    <span
                      id="after-submit-state"
                      className="bg-danger bg-gradient neonText"
                    >
                      {registerInput.error_list.email}
                    </span>
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="">Password</label>
                    <input
                      type=""
                      name="password"
                      className="form-control"
                      onChange={handleInput}
                      value={registerInput.password}
                    />
                    <span
                      id="after-submit-state"
                      className="bg-danger bg-gradient neonText"
                    >
                      {registerInput.error_list.password}
                    </span>
                  </div>
                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary">
                      Register
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

export default Register
