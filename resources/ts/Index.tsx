require('./bootstrap')
import React from 'react'
import ReactDOM from 'react-dom'


import { ReactApp } from '@/ReactApp' // Destructuring Object Literal
//import ReactApp from '@/react-app' // For Functions

if (document.getElementById('root')) {
  ReactDOM.render(
    <React.StrictMode>
      <ReactApp />
    </React.StrictMode>,
    document.querySelector('#root')
  )
}
