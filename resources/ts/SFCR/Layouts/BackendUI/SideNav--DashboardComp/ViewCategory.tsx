import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

// My NPM Libraries
import Swal from 'sweetalert2'

function ViewCategory() {
  const history = useHistory()
  const [loading, setLoading] = useState(true)
  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    axios.get(`/api/Sanctum-CategoryKeyForAdminsOnly`).then((res) => {
      console.log('isUseState_1st_index_an_obj? =>', categoryList)
      console.log(
        'isUseState_1st_index_an_arr? =>',
        Array.isArray(categoryList)
      )
      if (res.status === 200) {
        console.log('return data from the server', res.data)
        console.log(setCategoryList(res.data.category_table_from_reactecom_db))
        /* this setMethod State will fetched and parsed it to JS OBJ
        then it will give it to index 0 its data for some reason
        it logs undefined to the console idk why hehe
        */
      }
      setLoading(false)
    })
  }, [])

  const deleteCategoryById = (e, id) => {
    e.preventDefault()
    const thisClicked = e.currentTarget
    thisClicked.innerText = 'Deleting'

    axios.delete(`/api/Sanctum-CategoryKeyForAdminsOnly/${id}`).then((res) => {
      if (res.data.status === 200) {
        Swal.fire('Success', res.data.message, 'success')
        thisClicked.closest('tr').remove()
      } else if (res.data.status === 404) {
        Swal.fire('Failed', res.data.message, 'warning')
        thisClicked.innerText = 'Delete'
      }
    })
  }

  var ViewCategoryTable__in__HTML = ''
  if (loading) {
    return <h4>Loading Category...</h4>
  } else {
    ViewCategoryTable__in__HTML = categoryList.map((item) => {
      console.log(Array.isArray(categoryList))

      return (
        <tr key={item.id}>
          <th scope="row">Row Group {item.id}</th>
          <td>{item.slug}</td>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>{item.status}</td>
          <td>{item.meta_title}</td>
          <td>{item.meta_keyword}</td>
          <td>{item.meta_description}</td>
          <td>
            <Link
              to={`edit-category/${item.id}`}
              className="btn btn-success btn-sm"
            >
              Edit
            </Link>
          </td>
          <td>
            <button
              type="button"
              onClick={(e) => {
                console.log(e)

                {
                  deleteCategoryById(e, item.id)
                }
              }}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </td>
        </tr>
      )
    })
  }

  const afterClickingLoginSubmitButton = (e) => {
    e.preventDefault()

    const getFormFieldsDataFromReactStates = {
      email: loginInput.email,
      password: loginInput.password,
    }

    axios.get('/sanctum/csrf-cookie').then((response) => {
      axios
        .post('api/sanctum-login', getFormFieldsDataFromReactStates)
        .then((res) => {
          console.log('===============______===============')
          console.log('Mga Nakiki-epal sa JSON Response natin =>', res.data)
          if (res.data.status === 200) {
            localStorage.setItem(
              'auth_token_received_from_sanctum',
              res.data.tokenFromThisResponse
            )
            localStorage.setItem(
              'auth_name_received_from_sanctum',
              res.data.username
            )
            Swal.fire('Success', res.data.message, 'success')
            // User Session Roles
            console.log('res is an base object in js', res)
            console.log(
              'res.data is an object INCEPTION Vibes  => ',
              res.data.session_role
            )

            if (res.data.session_role === 'admin') {
              history.push('/admin/dashboard')
            } else {
              history.push('/')
            }
          } else if (res.data.status === 401) {
            Swal.fire('Warning', res.data.message, 'warning')
          } else {
            setLogin({
              ...loginInput,
              error_list: res.data.validation_errors,
            })
          }
        })
    })
  }

  return (
    <div className="container px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            <Link
              to="/admin/category"
              className="btn btn-primary btn-sm float-end"
            >
              Add Category
            </Link>
          </h4>
        </div>
        <div className="card-body">
          {/* <!-- If you want it to read values Horizontally from Left to Right  --> */}
          <table
            border="5"
            sortable=""
            cellPadding="10"
            className="table table-bordered table-striped"
          >
            <caption>
              Table Row Value Instances (Reading Horizontally of Property
              Fields)
            </caption>
            <colgroup span="">
              <col span="2" />
              <col />
            </colgroup>
            <tfoot></tfoot>
            <thead>
              <tr align="center" bgcolor="#fcff00" colSpan="">
                <th scope="row">ROW KEYS</th>
                <th scope="col">slug</th>
                <th scope="col">name</th>
                <th scope="col">description</th>
                <th scope="col">status</th>
                <th scope="col">meta_title</th>
                <th scope="col">meta_keyword</th>
                <th scope="col">meta_description</th>
              </tr>
            </thead>
            <tbody>{ViewCategoryTable__in__HTML}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ViewCategory
