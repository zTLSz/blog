import { connect } from 'react-redux'
import { add, delpost, searchpost, blogReducer } from '../modules/blog'
import { bindActionCreators } from 'redux'


import Blog from '../components/Blog'


function mapDispatchToProps(dispatch) {
  return {
    addAction: bindActionCreators(add, dispatch),
    delAction: bindActionCreators(delpost, dispatch),
    searchAction: bindActionCreators(searchpost, dispatch)
  }
}


function mapStateToProps(state) {
  return {
    posts: state.blog.posts
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Blog)
