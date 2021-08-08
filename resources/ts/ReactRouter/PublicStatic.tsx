// import { StoreWelcomes } from '@/SFCR/layouts/FrontendUI/Store/StoreWelcomes'
// import CartPage from '@/SFCR/layouts/FrontendUI/Cart/Cart'

// Component Switching or Default near component appearing
import HomePage from '@/SFCR/Layouts/FrontendUI/Pages/Home'
import AboutPage from '@/SFCR/Layouts/FrontendUI/Pages/About'
import ContactPage from '@/SFCR/Layouts/FrontendUI/Pages/Contact'


import Detail from '@/SFCR/layouts/FrontendUI/store/StoreComp/Detail'
import CheckOutSuccess from '@/SFCR/layouts/FrontendUI/store/StoreComp/CheckOutSuccess'
import CheckOutCancel from '@/SFCR/layouts/FrontendUI/store/StoreComp/CheckOutCancel'

import { StoreWelcomes } from '@/SFCR/Layouts/FrontendUI/Store/StoreWelcomes'
import CartPage from '@/SFCR/layouts/FrontendUI/cart/Cart'

const PublicStatic = [
  {
    path: '/',
    exact: true,
    name: 'ClientSideDefaultHomePage',
    component: HomePage,
  },
  {
    path: '/about',
    exact: true,
    name: 'AboutRouteURI',
    component: AboutPage,
  },
  {
    path: '/contact',
    exact: true,
    name: 'ContactRouteURI',
    component: ContactPage,
  },
  {
    path: '/store',
    exact: true,
    name: 'StoreAppPageRouteURI',
    component: StoreWelcomes,
  },

  {
    path: '/store/product-details/:slug',
    exact: true,
    name: 'ProdDetailsPageUrlRoute',
    component: Detail,
  },
  {
    path: '/store/checkout-success',
    exact: true,
    name: 'CheckOutSuccessPageUrlRoute',
    component: CheckOutSuccess,
  },
  {
    path: '/store/checkout-cancel',
    exact: true,
    name: 'CheckOutCancelPageUrlRoute',
    component: CheckOutCancel,
  },

  {
    path: '/cart',
    exact: true,
    name: 'CartFeaturePageRoute',
    component: CartPage,
  },

]

export default PublicStatic
