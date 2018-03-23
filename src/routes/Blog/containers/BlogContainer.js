import { connect } from 'react-redux'
import { attack, blogReducer, bc1, bc2, cw1, save, load } from '../modules/blog'
import { bindActionCreators } from 'redux'


import Blog from '../components/Blog'


function mapDispatchToProps(dispatch) {
  return {
    attackAction: bindActionCreators(attack, dispatch),
    bc1action: bindActionCreators(bc1, dispatch),
    bc2action: bindActionCreators(bc2, dispatch),
    cw1action: bindActionCreators(cw1, dispatch),
    saveaction: bindActionCreators(save, dispatch),
    loadaction: bindActionCreators(load, dispatch),
  }
}


function mapStateToProps(state) {
  return {
    health: state.blog.health,
    gold: state.blog.gold,
    kills: state.blog.kills,
    level: state.blog.level,
    clicker_1: state.blog.clicker_1,
    clicker_2: state.blog.clicker_2,
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Blog)
