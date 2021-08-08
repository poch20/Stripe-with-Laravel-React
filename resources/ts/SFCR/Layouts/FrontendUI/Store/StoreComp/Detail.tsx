import React, {useState, useEffect} from 'react'
import { useParams, useRouteMatch } from 'react-router-dom'
import '@css/stripe-css/gateway-interface-visuals.css'
// SPA Components
import StripeConfirmationCheckOut from '@/SFCR/layouts/FrontendUI/StripeCGI/StripeConfirmationCheckOut'

function Detail() {
  const [storedProductData, setProductData] = useState([])

  const [showItem, setShowItem] = useState(false)
  const isBlogPostRoute = useRouteMatch("/store/product-details/:slug")
  const [post, setPost] = React.useState(null);
  const { slug } = useParams();
  const id = slug

  useEffect(() => {
    axios.get(`/api/get-products/${id}`).then((res) => {
      if (res.status === 200) {
        setProductData(res.data.product_table_from_reactecom_db)
      }
    })
    fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [slug]);
  return (
    <div>
      <img
        src={`${process.env.ASSET_PATH}${storedProductData.img}`}
        alt="The cover of Stubborn Attachments"
      />
      {showItem ? <StripeConfirmationCheckOut obj={storedProductData} idRef={id}/>
      :
      <>
        <h3>{storedProductData.selling_price}</h3>
        <button className="ReactStripeDemo-submitButton" onClick={()=> setShowItem(true)}>Purchase</button>
      </>
      }
    </div>
  )
}

export default Detail
