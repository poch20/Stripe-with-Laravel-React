import React from 'react'
import { Link } from 'react-router-dom'

import Triad from './Triad'

export default function Test() {
  return (
    <ul>
      <li>
        <Link to="/">
          <Home />
        </Link>
      </li>
    </ul>
  )
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  )
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  )
}
