import { connect } from 'react-redux'
import { add, delpost, searchpost, blogReducer } from '../modules/blog'
import { bindActionCreators } from 'redux'


import TestPage from '../components/TestPage'




function mapStateToProps(state) {
  return {
    posts: state.blog.posts
  }
}



export default connect(mapStateToProps)(TestPage)
