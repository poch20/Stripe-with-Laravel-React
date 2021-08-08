import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

// My NPM Libraries
import Swal from 'sweetalert2'

function ViewCategory() {
  //React Hooks

  // Loading State for until data comes out
  const [awaitingDataArrival, setArrival] = useState(true)

  // State for Fetching Product Table
  const [storedProductData, setProductData] = useState([])
  useEffect(() => {
    axios.get(`/api/Sanctum-ProductKeyForAdminsOnly`).then((res) => {
      if (res.status === 200) {
        setProductData(res.data.product_table_from_reactecom_db)
        setArrival(false)
      }
    })
  }, [])
  if (awaitingDataArrival) {
    return <h1>Loading of Viewing Product Table Data</h1>
  } else {
    let readPhotoFromDB = storedProductData.map((item) => {
      return 'public/storage/' + item.img
    })
    console.log(readPhotoFromDB)

    //(this.profileForm.photo.length > 200) ? this.profileForm.photo : "img/profile/"+ this.profileForm.photo
    var ProdStatus = ''
    var display_product_data_in_html_table = storedProductData.map((item) => {
      if (item.status == 0) {
        ProdStatus = 'Shown'
      } else if (item.status == 1) {
        ProdStatus = 'Hidden'
      }
      return (
        <tr key={item.id} id={item.id}>
          <th>{item.id}</th>
          <th>
            {
              item
                .category_model__is_a_component_of__product_model_as_a_foreign_key
                .name
            }
          </th>
          <th>{item.name}</th>
          <th>{item.selling_price}</th>
          <th>
            <img src={`/${item.img}`} width="50px" />
          </th>
          <td>
            <Link
              to={`/admin/update-product/${item.id}`}
              className="btn btn-success btn-sm"
            >
              Edit
            </Link>
          </td>
          <td>
            {ProdStatus}
          </td>
        </tr>
      )
    })
  }
  return (
    <div className="card px-4 mt-3">
      <div className="card-header">
        <h4>
          View Product
          <Link
            to="/admin/create-product"
            className="btn btn-primary btn-sm float-end"
          >
            Add Product
          </Link>
        </h4>
      </div>
      <div className="card-body">
        <table
          className="table-responsive table table-boredered table-striped"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Category Name</th>
              <th>Product Name</th>
              <th>Selling Price</th>
              <th>Image</th>
              <th>Edit</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{display_product_data_in_html_table}</tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewCategory
