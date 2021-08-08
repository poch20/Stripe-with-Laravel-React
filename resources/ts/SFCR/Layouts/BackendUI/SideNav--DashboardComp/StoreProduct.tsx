import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

// My NPM Libraries
import Swal from 'sweetalert2'

function StoreProduct() {
  const history = useHistory()

  // For Preparing to Get Category Table Data
  const [
    storage_location_memory_address_of_existing_fectched_data_from_the_server,
    fetched_and_ParsedJSON_to_jsObjLitNot__then_set_this_to_the_declared_array_at_index_zero,
  ] = useState([])

  // User Input States
  const [defineProductInputs, setProductInputs] = useState({
    // category_table_foreign_key
    category_id: '',
    slug: '',
    name: '',
    description: '',

    meta_title: '',
    meta_keyword: '',
    meta_description: '',

    selling_price: '',
    original_price: '',
    qty: '',
    img: '',
    brand: '',
    featured: '',
    popular: '',
    status: '',
    filename: '',
  })

  // User File Uploads State
  const [defineProductUploads, setProductUploads] = useState([])

  // Error States
  const [defineError, setError] = useState([])

  const data_manipulation_handler_before_compiling_to_server = (e) => {
    e.persist()
    console.log(
      'from Axios an Array of Objects =>',
      storage_location_memory_address_of_existing_fectched_data_from_the_server
    )

    console.log([e.target.name])

    // Merged an Object to an Object
    const inputFileName = document.getElementById(
      'InptT__idAttr__filename'
    ).value

    setProductInputs({
      ...defineProductInputs,
      [e.target.name]: e.target.value,
      ['filename']: inputFileName,
    })
    console.log(
      `defineProductInputs Array will be converted into an Pure Object Lit Notation
      and will Merge an Object with property value to do this first the OLD Object
      Syntax [Primitive Immutable Type and This will become a prop name]: set a value
      =>`,
      defineProductInputs
    )

    // Review of Spread Operators and REST parameters
    let arrayIsAnObjectToo = []
    let justDefine__to_be_use_and_become_a_prop_field_to_an_obj = function () {} // Primitive Type or Data Structure
    // as long as oh basta immutable yung data type ibig sabihin NON-CHANGEABLE or CONST
    let objClone = {
      ...arrayIsAnObjectToo,
      [justDefine__to_be_use_and_become_a_prop_field_to_an_obj]: 'New Value',
    }
    console.log(
      'objClone New Object and also will convert Arrays into Object Lit =>',
      objClone
    )
  }
  const data_manipulation_handleFileUploads_before_compiling_inputData_to_server =
    (e) => {
      let fullPath = document.getElementById(
        'InpT__idAttr__theActualFile'
      ).value
      let fileNameInput = document.getElementById(
        'InptT__idAttr__filename'
      ).value
      console.log('fullPath =>', fileNameInput)

      function projFileName() {
        if (fullPath) {
          var startIndex =
            fullPath.indexOf('\\') >= 0
              ? fullPath.lastIndexOf('\\')
              : fullPath.lastIndexOf('/')
          var filename = fullPath.substring(startIndex)
          if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1)
          }
          return filename
        }
      }
      let fileName = projFileName()
      // Merged an Object to an Object

      setProductUploads({
        img: e.target.files[0],
        fileNameText: fileNameInput,
        hidden: fileName,
        userSessionAPI__via__localStorage: localStorage.getItem(
          'auth_name_received_from_sanctum'
        ),
      })
    }

  useEffect(() => {
    /**
     *
     *
     * @var axios
     */
    axios
      .get(`/api/Sanctum__ForAdminsOnly/GetAllCategory_Where__statusIsZero`)
      .then((res) => {
        if (res.data.status === 200) {
          // Store the Parsed Return JSON Data to useState Array
          fetched_and_ParsedJSON_to_jsObjLitNot__then_set_this_to_the_declared_array_at_index_zero(
            res.data.category_table_get_all_where__statusIsZero
          )
        }
      })
  }, [])

  const handler_of_all_product_input_and_upload_fields_after__this_form_is_submitted =
    (e) => {
      e.preventDefault()
      if (defineProductUploads.img['size'] < 5501775) {
        console.log('defineProductInputs =>', defineProductInputs)
        console.log('defineProductUploads =>', defineProductUploads.hidden)

        // Javascript Form Data Constructor
        const formData = new FormData()
        // Syntax .append('[e.target.name]', set value)
        formData.append('img', defineProductUploads.img)
        formData.append('category_id', defineProductInputs.category_id)
        formData.append('slug', defineProductInputs.slug)
        formData.append('name', defineProductInputs.name)
        formData.append('description', defineProductInputs.description)

        formData.append('meta_title', defineProductInputs.meta_title)
        formData.append('meta_keyword', defineProductInputs.meta_keyword)
        formData.append(
          'meta_description',
          defineProductInputs.meta_description
        )

        formData.append('selling_price', defineProductInputs.selling_price)
        formData.append('original_price', defineProductInputs.original_price)
        formData.append('qty', defineProductInputs.qty)
        formData.append('brand', defineProductInputs.brand)
        formData.append('featured', defineProductInputs.featured)
        formData.append('popular', defineProductInputs.popular)
        formData.append('status', defineProductInputs.status)
        formData.append(
          'InptT__nameAttr__filename',
          defineProductInputs.filename
        )
        formData.append(
          'InpT__nameAttr__hiddenValueFileNameText',
          defineProductUploads.fileNameText
        )
        formData.append(
          'InpT__nameAttr__hiddenValue',
          defineProductUploads.hidden
        )
        formData.append(
          'InpT__nameAttr__hiddenValue__API__Token',
          defineProductUploads.userSessionAPI__via__localStorage
        )

        // Axios is provided by Laravel already by default located in my libraries.tsx > require(bootstrap)
        axios.get('/sanctum/csrf-cookie').then((response) => {
          axios
            .post('/api/Sanctum-ProductKeyForAdminsOnly', formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((res) => {
              if (res.data.status === 200) {
                Swal.fire('Success', res.data.message, 'success'),
                  document.getElementById('formTagIdAttr__formProduct').reset()
                history.push('/admin/create-product')
              } else if (res.data.status === 422) {
                console.log(
                  'response in JSON Format',
                  res.data.validation_errors
                )
                Swal.fire('All Fields are Mandatory', '', 'error')
                // setCategory({
                //   ...categoryDataUserInputs,
                //   error_list: res.data.validation_errors,
                // })
                setError(res.data.validation_errors)
                console.log(
                  'after getting a response back from the server-side'
                )
              }
            })
        })
      } else {
        Swal.fire({
          title: "You are uploading more than 5 MB's",
          text: 'Oops...',
          icon: 'error',
          confirmButtonText: 'Close',
        })
      }
    }

  return (
    <div className="card-body">
      <h1 className="mt-4">Add Product</h1>
      <form
        encType="multipart/form-data"
        id="formTagIdAttr__formProduct"
        method="post"
        onSubmit={
          handler_of_all_product_input_and_upload_fields_after__this_form_is_submitted
        }
      >
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Home
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="nav-link-itm--seo-tabs"
              data-bs-toggle="tab"
              data-bs-target="#tab-pane-content--seo-tabs"
              type="button"
              role="tab"
              aria-controls="tab-pane-content--seo-tabs"
              aria-selected="false"
            >
              SEO Tags
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="nav-link-itm--otherdetails"
              data-bs-toggle="tab"
              data-bs-target="#tab-pane-content--otherdetails"
              type="button"
              role="tab"
              aria-controls="otherdetails"
              aria-selected="false"
            >
              Other Details
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane card-body border fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="form-group mb-3">
              <label>Select Category</label>
              <select
                onChange={data_manipulation_handler_before_compiling_to_server}
                className="form-control"
                name="category_id"
              >
                <option value={defineProductInputs.category_id}>
                  Select Category
                </option>
                {storage_location_memory_address_of_existing_fectched_data_from_the_server.map(
                  (item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    )
                  }
                )}
              </select>
              <small className="text-danger">{defineError.category_id}</small>
            </div>
            <div className="form-group mb-3">
              <label>Slug</label>
              <input
                onChange={data_manipulation_handler_before_compiling_to_server}
                value={defineProductInputs.slug}
                type="text"
                name="slug"
                className="form-control"
              />
            </div>
            {/* <span
              id="after-submit-state"
              className="bg-danger bg-gradient neonText"
            >
              {categoryDataUserInputs.error_list.slug}
            </span> */}
            <small className="text-danger">{defineError.slug}</small>
            <div className="form-group mb-3">
              <label>Name</label>
              <input
                onChange={data_manipulation_handler_before_compiling_to_server}
                value={defineProductInputs.name}
                type="text"
                name="name"
                className="form-control"
              />
            </div>
            {/* <span
              id="after-submit-state"
              className="bg-danger bg-gradient neonText"
            >

            </span> */}
            <small className="text-danger">{defineError.name}</small>
            <div className="form-group mb-3">
              <label>Description</label>
              <textarea
                onChange={data_manipulation_handler_before_compiling_to_server}
                value={defineProductInputs.description}
                name="description"
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label>Status</label>
              <input
                onChange={data_manipulation_handler_before_compiling_to_server}
                value={defineProductInputs.status}
                type="checkbox"
                name="status"
              />{' '}
              Status 0=shown/1=hidden
            </div>
          </div>
          <div
            className="tab-pane fade card-body border"
            id="tab-pane-content--seo-tabs"
            role="tabpanel"
            aria-labelledby="nav-link-itm--seo-tabs"
          >
            <div className="form-group mb-3">
              <label>Meta Title</label>
              <input
                onChange={data_manipulation_handler_before_compiling_to_server}
                value={defineProductInputs.meta_title}
                type="text"
                name="meta_title"
                className="form-control"
              />
            </div>
            <small
              id="after-submit-state"
              className="bg-danger bg-gradient neonText"
            >
              {defineError.meta_title}
            </small>
            <div className="form-group mb-3">
              <label>Meta Keywords</label>
              <input
                onChange={data_manipulation_handler_before_compiling_to_server}
                value={defineProductInputs.meta_keyword}
                type="text"
                name="meta_keyword"
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label>Meta Description</label>
              <input
                onChange={data_manipulation_handler_before_compiling_to_server}
                value={defineProductInputs.meta_description}
                type="text"
                name="meta_description"
                className="form-control"
              />
            </div>
          </div>
          <div
            className="tab-pane fade card-body border"
            id="tab-pane-content--otherdetails"
            role="tabpanel"
            aria-labelledby="nav-link-itm--otherdetails"
          >
            <div className="row">
              <div className="col-md-4 form-group mb-3">
                <label>Selling Price</label>
                <input
                  onChange={
                    data_manipulation_handler_before_compiling_to_server
                  }
                  value={defineProductInputs.selling_price}
                  type="text"
                  name="selling_price"
                  className="form-control"
                />
                <small className="text-danger">
                  {defineError.selling_price}
                </small>
              </div>
              <div className="col-md-4 form-group mb-3">
                <label>Original Price</label>
                <input
                  onChange={
                    data_manipulation_handler_before_compiling_to_server
                  }
                  value={defineProductInputs.original_price}
                  type="text"
                  name="original_price"
                  className="form-control"
                />
                <small className="text-danger">
                  {defineError.original_price}
                </small>
              </div>
              <div className="col-md-4 form-group mb-3">
                <label>Quantity</label>
                <input
                  onChange={
                    data_manipulation_handler_before_compiling_to_server
                  }
                  value={defineProductInputs.qty}
                  type="text"
                  name="qty"
                  className="form-control"
                />
                <small className="text-danger">{defineError.qty}</small>
              </div>
              <div className="col-md-4 form-group mb-3">
                <label>Brand</label>
                <input
                  onChange={
                    data_manipulation_handler_before_compiling_to_server
                  }
                  value={defineProductInputs.brand}
                  type="text"
                  name="brand"
                  className="form-control"
                />
                <small className="text-danger">{defineError.brand}</small>
              </div>

              <div className="col-md-8 form-group mb-3">
                <label>Image</label>
                <small
                  id="after-submit-state"
                  className="bg-danger bg-gradient neonText"
                >
                  {defineError.filename}
                </small>
                <input
                  onChange={
                    data_manipulation_handler_before_compiling_to_server
                  }
                  value={defineProductInputs.filename}
                  type="text"
                  placeholder="filename; you can leave this as is, the default filename will be use"
                  className="form-control"
                  name="InptT__nameAttr__filename"
                  id="InptT__idAttr__filename"
                />
                <input
                  type="hidden"
                  style={{ display: 'none' }}
                  name="InpT__nameAttr__hiddenValueFileNameText"
                />
                <input
                  type="hidden"
                  style={{ display: 'none' }}
                  name="InpT__nameAttr__hiddenValue"
                />
                <input
                  type="hidden"
                  style={{ display: 'none' }}
                  name="InpT__nameAttr__hiddenValue__API__Token"
                />
                <input
                  onChange={
                    data_manipulation_handleFileUploads_before_compiling_inputData_to_server
                  }
                  type="file"
                  name="img"
                  className="form-control"
                  id="InpT__idAttr__theActualFile"
                />
                <small className="text-danger">{defineError.img}</small>
              </div>
              <div className="col-md-4 form-group mb-3">
                <label>Featured (Checked=Shown)</label>
                <input
                  onChange={
                    data_manipulation_handler_before_compiling_to_server
                  }
                  value={defineProductInputs.featured}
                  type="checkbox"
                  name="featured"
                  className="w-50 h-50"
                />
              </div>
              <div className="col-md-4 form-group mb-3">
                <label>Popular (Checked=Shown)</label>
                <input
                  onChange={
                    data_manipulation_handler_before_compiling_to_server
                  }
                  value={defineProductInputs.popular}
                  type="checkbox"
                  name="popular"
                  className="w-50 h-50"
                />
              </div>
              <div className="col-md-4 form-group mb-3">
                <label>Status (Checked=Hidden)</label>
                <input
                  onChange={
                    data_manipulation_handler_before_compiling_to_server
                  }
                  value={defineProductInputs.status}
                  type="checkbox"
                  name="status"
                  className="w-50 h-50"
                />
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary px-4 mt-2 float-end">
          Post Products
        </button>
      </form>
    </div>
  )
}

export default StoreProduct
