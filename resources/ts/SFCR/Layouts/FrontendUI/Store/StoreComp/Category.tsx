import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'


function Category() {
  const location = useLocation()
  const [awaitingDataArrival, setArrival] = useState(true)
  const [storedProductData, setProductData] = useState([])
  useEffect(() => {

    axios.get(`/api/get-products/`).then((res) => {
      if (res.status === 200) {
        setProductData(res.data.product_table_from_reactecom_db)
        setArrival(false)
      }
    })
  },[])
  if (awaitingDataArrival) {
    return <h1>Loading of Viewing Product Table Data</h1>
  } else {
    var ProdStatus = ''
    var display_product_data_in_html_table = storedProductData.map((item) => {
      if (item.status == 0) {
        ProdStatus = 'Shown'
      } else if (item.status == 1) {
        ProdStatus = 'Hidden'
      }
      return (

        <div className="card shadow-sm" key={item.id} id={item.id}>
          <img className="img-fluid" alt="Responsive image" src={ `${process.env.ASSET_PATH}${item.img}` }/>
          <div className="card-body">
            <p className="card-text">
              {/* {{ route('products.addToCart', $product->id) }} = http://localhost:8000/api/products/1/addToCart  */}
              <Link className="text-dark text-decoration-none" to={`/store/product-details/${item.slug}`}>{ item.name }</Link>
            </p>
            <div className="d-flex justify-content-between align-items-center">
                 <Link to={`/store/product-details/${item.id}`}><small className="text-muted">Buy</small></Link>
                 <Link target="__blank" to={`/api/products/${item.id}/addToCart`} className="btn btn-info btn-block"><i className="fa fa-cart-plus"></i> Add To Cart</Link>
            </div>
          </div>
        </div>

      )
    })
  }

  return (
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="pb-3 h5"></div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3">
          <div className="col">
            <div className="card shadow-sm">
            <div className="card-body">
              <p className="card-text">
                <Link className="text-dark text-decoration-none" to=""></Link>
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">Available Products</small>
              </div>
              {display_product_data_in_html_table}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category
