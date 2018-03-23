import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import User from '../components/User'
// import Page from '../components/Page'
import * as pageActions from '../actions/PageActions'

class App extends Component {
  render() {
    const { abc } = this.props
   const { test, delpost, searchpost } = this.props.pageActions
   // const { addPost  } = this.props.pageActions.Actions

    return <div className='row'>
      <BlogWrap test={test} abc={abc} delpost={delpost} searchpost={searchpost}/>
    </div>
  }
}
