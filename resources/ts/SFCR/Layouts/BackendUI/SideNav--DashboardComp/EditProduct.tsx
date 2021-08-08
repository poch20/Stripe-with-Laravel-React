import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

// My NPM Libraries
import Swal from 'sweetalert2'

function EditProduct(props) {
  let productKeyId = props.match.params.id
  const history = useHistory()
  const [loading, setLoading] = useState(true);
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
    filename: '',
    img: []
  })

  const [storeHidden, setHidden] = useState([])

  // User File Uploads State
  const [defineProductUploads, setProductUploads] = useState([])

  const [storeCheckBoxes, setCheckboxes] = useState([])
  // Error States
  const [defineError, setError] = useState([])

  const data_manipulation_handler_before_compiling_to_server = (e) => {
    e.persist()
    console.log('false ka diyan? =>', typeof storeCheckBoxes.status);
    console.log('Integer =>', typeof 1);
    console.log('Is Equal =>', 1 === parseInt(storeCheckBoxes.status));
    storeCheckBoxes.status === 1 ? true : console.log('false')

    const inputFileName = document.getElementById(
      'InptT__idAttr__filename'
    ).value

    setProductInputs({
      ...defineProductInputs,
      [e.target.name]: e.target.value,
      ['filename']: inputFileName,
    })
  }
  const data_manipulation_handleFileUploads_before_compiling_inputData_to_server =
    (e) => {


      if (e.target.files[0].size < 5000000) {
        let fullPath = document.getElementById(
          'InpT__idAttr__theActualFile'
        ).value
        let fileNameInput = document.getElementById(
          'InptT__idAttr__filename'
        ).value

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
        })
      } else {
        Swal.fire({
          title: "You are uploading more than 5 MB's",
          text: 'Oops...',
          icon: 'error',
          confirmButtonText: 'Close',
        })
        history.push('/admin/read-product')
      }
    }
  const InpT__onChangeEventAttr__handler = (e) => {
    e.persist()
    setCheckboxes({
      ...storeCheckBoxes,
      [e.target.name]: e.target.checked
    })
  }
  const handler_of_all_product_input_and_upload_fields_after__this_form_is_submitted =
    (e) => {
      e.preventDefault()

        // Javascript Form Data Constructor
        const formData = new FormData()
        // Syntax .append('[e.target.name]', set value)
        console.log('hasFile => ',defineProductUploads.img);

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
        formData.append('featured', storeCheckBoxes.featured ? '1':'0')
        formData.append('popular', storeCheckBoxes.popular ? '1':'0')
        formData.append('status', storeCheckBoxes.status ? '1':'0')
        formData.append(
          'InptT__nameAttr__filename',
          defineProductInputs.filename
        )
        formData.append(
          'InpT__nameAttr__hiddenValueFileNameText',
          defineProductUploads.fileNameText
        )
        formData.append(
          'InpT__nameAttr__hiddenValue_AppendPropId',
          productKeyId
        )

        formData.append(
          'InpT__nameAttr__hiddenValue',
          defineProductUploads.hidden
        )
        formData.append(
          'InpT__nameAttr__hiddenValue__API__Token',
          localStorage.getItem(
            'auth_name_received_from_sanctum'
          )
        )

        // Axios is provided by Laravel already by default located in my libraries.tsx > require(bootstrap)
        axios.get('/sanctum/csrf-cookie').then((response) => {
          axios
            .post('/api/spoofer-put-products', formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((res) => {
              if (res.data.status === 200) {
                Swal.fire('Success', res.data.message, 'success'),
                console.log('Stored Checkboxes =>', storeCheckBoxes);

                  document.getElementById('formTagIdAttr__formProduct').reset()
                history.push('/admin/read-product')
              } else if (res.data.status === 422) {
                Swal.fire('All Fields are Mandatory', '', 'error')
                setError(res.data.validation_errors)
              }
            })
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

        axios
            .get(`/api/Sanctum-ProductKeyForAdminsOnly/${productKeyId}`)
            .then((res) => {
                if (res.data.status === 200) {
                    setProductInputs(res.data.product_table_from_reactecom_db);
                    setCheckboxes(res.data.product_table_from_reactecom_db);
                } else if (res.data.status === 404) {
                    Swal.fire("Error", res.data.message, "error"),
                        history.push("/admin/view-category");
                }
                setLoading(false);
            });
    }, [props.match.params.id, history])
    if (loading) {
        return <h4>Loading Edit Product...</h4>;
    }
  return (
    <div className="card-body">
      <h1 className="mt-4">Edit Product</h1>
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
                value={defineProductInputs.category_id}
                className="form-control"
                name="category_id"
              >
                <option>
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
                  name="InpT__nameAttr__hiddenValue_AppendPropId"
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
                <img src={`/${defineProductInputs.img}`} width="100px" />
                <small className="text-danger">{defineError.img}</small>
              </div>
              <div className="col-md-4 form-group mb-3">
                <label>Featured (Checked=Shown)</label>
                <input
                  onChange={
                    InpT__onChangeEventAttr__handler
                  }
                  defaultChecked={parseInt(storeCheckBoxes.featured) === 1 ? true:false}
                  type="checkbox"
                  name="featured"
                  className="w-50 h-50"
                />
              </div>
              <div className="col-md-4 form-group mb-3">
                <label>Popular (Checked=Shown)</label>
                <input
                  onChange={
                    InpT__onChangeEventAttr__handler
                  }
                  defaultChecked={parseInt(storeCheckBoxes.popular) === 1 ? true:false}
                  type="checkbox"
                  name="popular"
                  className="w-50 h-50"
                />
              </div>
              <div className="col-md-4 form-group mb-3">
                <label>Status (Checked=Hidden)</label>
                <input
                  onChange={
                    InpT__onChangeEventAttr__handler
                  }
                  defaultChecked={parseInt(storeCheckBoxes.status) === 1 ? true : false}
                  type="checkbox"
                  name="status"
                  className="w-50 h-50"
                />
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary px-4 mt-2 float-end">
          Put Products
        </button>
      </form>
    </div>
  )
}

export default EditProduct
