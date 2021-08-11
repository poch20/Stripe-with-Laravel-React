import Category from '@/SFCR/layouts/FrontendUI/store/StoreComp/Category'
import Detail from '@/SFCR/layouts/FrontendUI/store/StoreComp/Detail'
import CheckOutSuccess from '@/SFCR/layouts/FrontendUI/store/StoreComp/CheckOutSuccess'
import CheckOutCancel from '@/SFCR/layouts/FrontendUI/store/StoreComp/CheckOutCancel'
const ClientRouteUrls = [
  { path: '/store', exact: true, name: 'StoreAppPageRouteURI' },
  {
    path: '/store/categories',
    exact: true,
    name: 'CategoryPageUrlRoute',
    component: Category,
    //<Route exact path="" component={Profile} />
  },
  {
    path: '/store/product-details/:slug',
    exact: true,
    name: 'ProdDetailsPageUrlRoute',
    component: Detail,
    //<Route exact path="" component={Profile} />
  },
  {
    path: '/store/checkout-success',
    exact: true,
    name: 'CheckOutSuccessPageUrlRoute',
    component: CheckOutSuccess,
    //<Route exact path="" component={Profile} />
  },
  {
    path: '/store/checkout-cancel',
    exact: true,
    name: 'CheckOutCancelPageUrlRoute',
    component: CheckOutCancel,
    //<Route exact path="" component={Profile} />
  },

]

export default ClientRouteUrls
