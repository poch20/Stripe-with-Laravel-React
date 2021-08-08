import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

// My SPA's
import Register from '@/SFCR/layouts/FrontendUI/Auth/Register'
import Login from '@/SFCR/layouts/FrontendUI/Auth/Login'

import MasterLayout from '@/SFCR/layouts/BackendUI/MasterLayouts'
import AdminPrivateRoute from '@/SFCR/layouts/BackendUI/AdminPrivateRoute'

import Page403 from '@/SFCR/layouts/Error_Interceptors_State_Disp_Page/Page403'
import Page404 from '@/SFCR/layouts/Error_Interceptors_State_Disp_Page/Page404'

import ClientStartingModelRoute from './ClientStartingModelRoute'


import CartPage from '@/SFCR/layouts/FrontendUI/cart/Cart'

// import Axios and implement Rule
import axios from 'axios'
//axios.defaults.baseURL = 'http://localhost:8000/'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'

axios.defaults.withCredentials = true
axios.interceptors.request.use(function (config) {
  const apiToken = localStorage.getItem('auth_token_received_from_sanctum')
  config.headers.Authorization = apiToken ? `Bearer ${apiToken}` : ''
  return config
})

export const ReactApp = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <AdminPrivateRoute path="/admin" name="AdminRoute" />
          <ClientStartingModelRoute path="/" name="ClientSideDefaultHomePage" />
          <Route path="/403" component={Page403} />
          <Route path="/404" component={Page404} />
          <Route path="/login">
            {localStorage.getItem('auth_token_received_from_sanctum') ? (
              <Redirect to="/" />
            ) : (
              <Login />
            )}
          </Route>
          <Route path="/register">
            {localStorage.getItem('auth_token_received_from_sanctum') ? (
              <Redirect to="/" />
            ) : (
              <Register />
            )}
          </Route>

        </Switch>
      </Router>
    </div>
  )
}
