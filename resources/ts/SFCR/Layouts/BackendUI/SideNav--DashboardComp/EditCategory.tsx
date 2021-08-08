import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

// My NPM Libraries
import Swal from 'sweetalert2'

function EditCategory(props) {
  const history = useHistory()
  const [loading, setLoading] = useState(true)
  const [defineErrorForEditCatPage, setErrorForEditCatPage] = useState([])
  const [editCategoryDataUserInputs, setEditCategory] = useState([])

  useEffect(() => {
    const categoryTablePrimaryKeyId = props.match.params.id

    /**
     * Bind Data Inputs via Axios to be received by the Backend and Update the Database
     * Gives back a JSON Format to be received and parsed by Client-Side Technology
     * @var axios
     */

    axios.get(`/api/Sanctum__ForAdminsOnly/GetAllCategory_Where__statusIsZero`)
    axios
      .get(`/api/Sanctum-CategoryKeyForAdminsOnly/${categoryTablePrimaryKeyId}`)
      .then((res) => {
        if (res.data.status === 200) {
          setEditCategory(res.data.category_table_from_reactecom_db)
          console.log(
            'Array.isArray(editCategoryDataUserInputs) =>',
            Array.isArray(editCategoryDataUserInputs)
          )
          console.log('+==============+')
          console.log(
            'setEditCategory Gives this to Index 0 as an Arr of Objects =>',
            res.data.category_table_from_reactecom_db
          )
          console.log('+==============+')
          console.log('[props.match.params.id, history]', [
            props.match.params.id,
            history,
          ])
        } else if (res.data.status === 404) {
          Swal.fire('Error', res.data.message, 'error'),
            history.push('/admin/view-category')
        }
        setLoading(false)
      })
  }, [props.match.params.id, history])

  const data_manipulation_handler_before_compiling_to_server = (e) => {
    e.persist()
    console.log(e.target.name)

    setEditCategory({
      ...editCategoryDataUserInputs,
      [e.target.name]: e.target.value,
    })
    console.log(
      'useState firstArg editCategoryDataUserInputs ObjLit',
      editCategoryDataUserInputs
    )
    /*useState Array Location Address of 1 setEditCategory Method Retrieves Object Data then
    Gives it to Array Location Index at 0 as an Array of Objects
    */
  }
  const handler_of_category_input_fields_after_form_submitted = (e) => {
    e.preventDefault()

    const categoryTablePrimaryKeyId = props.match.params.id
    const retrieved_data_field_objects_from_react_UseState = {
      editCategoryDataUserInputs,
    }
    console.log(
      'retrieved_data_field_objects_from_react_UseState Converts Array to Object => ',
      retrieved_data_field_objects_from_react_UseState.editCategoryDataUserInputs
    )

    // Axios is provided by Laravel already by default located in my libraries.tsx > require(bootstrap)
    //axios.get('/sanctum/csrf-cookie').then((response) => {
    console.log(
      'data to be sent to the server =>',
      retrieved_data_field_objects_from_react_UseState
    )

    axios
      .put(
        `/api/Sanctum-CategoryKeyForAdminsOnly/
          ${categoryTablePrimaryKeyId}`,
        retrieved_data_field_objects_from_react_UseState.editCategoryDataUserInputs
      )
      .then((res) => {
        if (res.data.status === 200) {
          Swal.fire('Success', res.data.message, 'success')
            //document.getElementById('formTagIdAttr__formCategory').reset()
            //history.push('/admin/category')

        } else if (res.data.status === 422) {
          console.log(res.data.validation_errors)

          Swal.fire(
            'All fields are Mandatory',
            'res.data.validation_errors',
            'error'
          )
          setErrorForEditCatPage(res.data.validation_errors)
        } else if (res.data.status === 404) {
          Swal.fire('Error', res.data.message, 'error')
          console.log('after getting a response back from the server-side')
        }
      })
    //})
  }

  if (loading) {
    return <h4>Loading Edit Category...</h4>
  }

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Edit Category</h1>
      <form
        method="POST" enctype="multipart/form-data"
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
                value={editCategoryDataUserInputs.slug}
                type="text"
                name="slug"
                className="form-control"
              />
            </div>
            <small className="text-danger">
              {defineErrorForEditCatPage.slug}
            </small>
            {/* <span
              id="after-submit-state"
              className="bg-danger bg-gradient neonText"
            >
              {editCategoryDataUserInputs.error_list.slug}
            </span>*/}
            <div className="form-group mb-3">
              <label>Name</label>
              <input
                onChange={data_manipulation_handler_before_compiling_to_server}
                value={editCategoryDataUserInputs.name}
                type="text"
                name="name"
                className="form-control"
              />
            </div>
            <small className="text-danger">
              {defineErrorForEditCatPage.slug}
            </small>
            {/* <span
              id="after-submit-state"
              className="bg-danger bg-gradient neonText"
            >
              {editCategoryDataUserInputs.error_list.name}
            </span> */}
            <div className="form-group mb-3">
              <label>Description</label>
              <textarea
                onChange={data_manipulation_handler_before_compiling_to_server}
                value={editCategoryDataUserInputs.description}
                name="description"
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label>Status</label>
              <input
                onChange={data_manipulation_handler_before_compiling_to_server}
                value={editCategoryDataUserInputs.status}
                type="checkbox"
                name="status"
              />
              0=shown/1=hidden
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
                value={editCategoryDataUserInputs.meta_title}
                type="text"
                name="meta_title"
                className="form-control"
              />
            </div>
            <small className="text-danger">
              {defineErrorForEditCatPage.slug}
            </small>
            {/* <span
              id="after-submit-state"
              className="bg-danger bg-gradient neonText"
            >
              {editCategoryDataUserInputs.error_list.meta_title}
            </span> */}
            <div className="form-group mb-3">
              <label>Meta Keywords</label>
              <input
                onChange={data_manipulation_handler_before_compiling_to_server}
                value={editCategoryDataUserInputs.meta_keyword}
                type="text"
                name="meta_keyword"
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label>Meta Description</label>
              <input
                onChange={data_manipulation_handler_before_compiling_to_server}
                value={editCategoryDataUserInputs.meta_description}
                type="text"
                name="meta_description"
                className="form-control"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary px-4 float-end">
          Update Request
        </button>
      </form>
    </div>
  )
}

export default EditCategory
