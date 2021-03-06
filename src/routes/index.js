// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/PageLayout/PageLayout'
import Home from './Home'
import TestPage from './TestPage'
import BlogRoute from './Blog'
import AdminRoute from './Admin'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [
    TestPage(store), BlogRoute(store), AdminRoute(store)
  ]
})



export default createRoutes
