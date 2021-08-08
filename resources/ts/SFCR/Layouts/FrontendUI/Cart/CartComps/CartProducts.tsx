import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { formatNumber } from '@/Helpers/utils'

import CartItem from './CartItem'

const CartProducts = () => {
  const location = useLocation()
  const [awaitingDataArrival, setArrival] = useState(true)
  const [storedCartItemData, setCartItemData] = useState([])

  const Butt__onClickE__nice = (e) => {
    var stripe = Stripe(
      'pk_test_51JHvyoIGKwUrcoanwLXDtHup9Mp5Zi36uRdNzKE77umvOZizSfl4vP8yQ8MP8jtJwa1qnKLVMZHZS1SR2uSFoq3Y00nMRlRvfQ'
    )

    axios.get('/sanctum/csrf-cookie').then((response) => {
      axios
        .post('/api/checkout-to-stripe', {
          headers: { 'Content-Type': 'application/json' },
          // https://www.ibm.com/docs/en/order-management-sw/9.4.0?topic=services-specifying-http-headers
        })
        .then((res) => {
          return stripe.redirectToCheckout({ sessionId: res.data.id })
        })
    })
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.stripe.com/v3/'
    script.async = true
    document.body.appendChild(script)

    axios.get(`/api/retrived-cart-items`).then((res) => {
      if (res.status === 200) {
        setCartItemData(res.data.cartItem_table)

        setArrival(false)
      }
    })
  }, [])
  if (awaitingDataArrival) {
    return <h1>Loading of Viewing CartItem Table Data</h1>
  }

  const cartItemSumTotal = storedCartItemData.reduce(
    (cartItemTable, string) => cartItemTable + parseInt(string.total, 10),
    0
  )

  var display_product_data_in_html_table = storedCartItemData.map((item) => {
    // if (item.status == 0) {
    //   ProdStatus = 'Shown'
    // } else if (item.status == 1) {
    //   ProdStatus = 'Hidden'
    // }
    return (
      <tr key={item.id} id={item.id}>
        <th></th>
        <td>{item.product.name}</td>
        <td>
          <img
            src={`${process.env.ASSET_PATH}${item.product.img}`}
            className="img-thumbnail"
            style={{ height: '50px' }}
          />
        </td>
        <td>{item.price}</td>
        <td>{item.quantity}</td>
        <td>{formatNumber(item.total)}</td>

        <td>
          <a
            href={`${process.env.ASSET_PATH}api/cart/${item.product.id}/remove`}
            className="text-danger"
          >
            X
          </a>
        </td>
      </tr>
    )
  })

  return (
    <div>
      <div className="card card-body border-0">
        <div className="card px-4 mt-3">
          <div className="card-body">
            <table className="table-responsive table table-boredered table-striped">
              <caption>Table Row Value Instances</caption>
              <colgroup span="" style={{ backgroundColor: 'orange' }}>
                <col span="2" style={{ backgroundColor: '#f4fbea' }} />
                <col style={{ backgroundColor: '#aef642' }} />
              </colgroup>
              <tfoot>
                <tr>
                  <th colSpan="4"></th>
                  <th>Grand Total</th>
                  {storedCartItemData.length >= 1 ? (
                    <th>{formatNumber(cartItemSumTotal)}</th>
                  ) : (
                    <th>{formatNumber(cartItemSumTotal)}</th>
                  )}
                </tr>
              </tfoot>
              <thead>
                <tr align="center" bgcolor="#fcff00" colSpan="">
                  <th></th>
                  <th>Product</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {display_product_data_in_html_table}
                {storedCartItemData.length > 0 ? (
                  <tr></tr>
                ) : (
                  <tr>
                    <td colSpan="6" align="center">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {storedCartItemData.length > 0 ? (
              <button
                className="btn btn-primary btn-block"
                onClick={Butt__onClickE__nice}
                id="checkout-button"
              >
                Pay {formatNumber(cartItemSumTotal)}
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartProducts
