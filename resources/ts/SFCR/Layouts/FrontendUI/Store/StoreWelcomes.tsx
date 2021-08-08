import React from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'

import { FaCartPlus } from 'react-icons/fa'

import PublicStatic from '@/ReactRouter/ClientRouteUrls'

import Category from '@/SFCR/layouts/FrontendUI/store/StoreComp/Category'

export const StoreWelcomes = () => {
  return (
    <div>
      <h2>Welcome to the Store!</h2>
      <Link to="/cart">
        <FaCartPlus />
      </Link>
      <main>
        <Category />
      </main>
    </div>
  )
}
