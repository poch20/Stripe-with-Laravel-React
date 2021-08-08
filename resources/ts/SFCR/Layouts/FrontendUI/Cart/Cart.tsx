import React, { useContext, useEffect, useState } from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'

import ClientRouteUrls from '@/ReactRouter/ClientRouteUrls'

// My Custom Helpers
import { formatNumber } from '@/helpers/utils';

// In the Scope of this Context

// Cart Components
import CartProducts from './CartComps/CartProducts';

const CartPage = () => {

  return (
    <div>
      <div className="text-center mt-5">
        <h1>Cart</h1>
        <p>This is the Cart Page.</p>
      </div>
      <div className="row no-gutters justify-content-center">
        <div className="col-sm-9 p-3">
          <CartProducts/>
          <div className="p-3 text-center text-muted">Your cart is empty</div>

          <div className="p-3 text-center text-success">
            <p>Checkout successfull</p>
            <Link to="/" className="btn btn-outline-success btn-sm">
              BUY MORE
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
