import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

// My NPM Libraries
import Swal from 'sweetalert2'

function Category() {
  const history = useHistory()
  const [categoryDataUserInputs, setCategory] = useState({
    slug: '',
    name: '',
    description: '',
    status: '',
    meta_title: '',
    meta_keyword: '',
    meta_description: '',
    error_list: [],
  })

  const data_manipulation_handler_before_compiling_to_server = (e) => {
    e.persist()
    console.log(e.target.name)

    setCategory({
      ...categoryDataUserInputs,
      [e.target.name]: e.target.value,
    })
    console.log(
      'useState firstArg categoryDataUserInputs ObjLit',
      categoryDataUserInputs
    )
    //console.log('useState 2ndArg setCategory Method', setCategory)
  }
  const handler_of_category_input_fields_after_form_submitted = (e) => {
    e.preventDefault()

    const retrieved_data_field_objects_from_react_UseState = {
      slug: categoryDataUserInputs.slug,
      name: categoryDataUserInputs.name,
      description: categoryDataUserInputs.description,
      status: categoryDataUserInputs.status,
      meta_title: categoryDataUserInputs.meta_title,
      meta_keyword: categoryDataUserInputs.meta_keyword,
      meta_description: categoryDataUserInputs.meta_description,
    }

    // Axios is provided by Laravel already by default located in my libraries.tsx > require(bootstrap)
    axios.get('/sanctum/csrf-cookie').then((response) => {
      axios
        .post(
          '/api/Sanctum-CategoryKeyForAdminsOnly',
          retrieved_data_field_objects_from_react_UseState
        )
        .then((res) => {
          if (res.data.status === 200) {
            Swal.fire('Success', res.data.message, 'success'),
              document.getElementById('formTagIdAttr__formCategory').reset()
            history.push('/admin/category')
          } else if (res.data.status === 400) {
            console.log('response in JSON Format', res.data.validation_errors)
            setCategory({
              ...categoryDataUserInputs,
              error_list: res.data.validation_errors,
            })
            console.log('after getting a response back from the server-side')
          }
        })
    })
  }

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Add Category</h1>
      <form
        id="formTagIdAttr__formCategory"
        onSubmit={handler_of_category_input_fields_after_form_submitted}
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
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane card-body border fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="form-group mb-3">
              <label>Slug</label>
              <input
                onChange={data_manipulation_handler_before_compiling_to_server}
                value={categoryDataUserInputs.slug}
                type="text"
                name="slug"
                className="form-control"
              />
            </div>
            <span
              id="after-submit-state"
              className="bg-danger bg-gradient neonText"
            >
              {categoryDataUserInputs.error_list.slug}
            </span>
            <div className="form-group mb-3">
              <label>Name</label>
              <input
                onChange={data_manipulation_handler_before_compiling_to_server}
                value={categoryDataUserInputs.name}
                type="text"
                name="name"
                className="form-control"
              />
            </div>
            <span
              id="after-submit-state"
              className="bg-danger bg-gradient neonText"
            >
              {categoryDataUserInputs.error_list.name}
            </span>
            <div className="form-group mb-3">
              <label>Description</label>
              <textarea
                onChange={data_manipulation_handler_before_compiling_to_server}
                value={categoryDataUserInputs.description}
                name="description"
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label>Status</label>
              <input
                onChange={data_manipulation_handler_before_compiling_to_server}
                value={categoryDataUserInputs.status}
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
                value={categoryDataUserInputs.meta_title}
                type="text"
                name="meta_title"
                className="form-control"
              />
            </div>
            <span
              id="after-submit-state"
              className="bg-danger bg-gradient neonText"
            >
              {categoryDataUserInputs.error_list.meta_title}
            </span>
            <div className="form-group mb-3">
              <label>Meta Keywords</label>
              <input
                onChange={data_manipulation_handler_before_compiling_to_server}
                value={categoryDataUserInputs.meta_keyword}
                type="text"
                name="meta_keyword"
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label>Meta Description</label>
              <input
                onChange={data_manipulation_handler_before_compiling_to_server}
                value={categoryDataUserInputs.meta_description}
                type="text"
                name="meta_description"
                className="form-control"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary px-4 float-end">
          Submit Request
        </button>
      </form>
    </div>
  )
}

export default Category
