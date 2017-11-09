import TestPage from './components/TestPage'

export default (store) => ({
  path : 'TestPage',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const TestPage = require('./components/TestPage').default
      cb(null, TestPage)

    }, 'TestPage')
  }
})
