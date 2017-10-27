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

class BlogWrap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      text: ''
    }

  }

  addpostBlog() {
    this.props.test(this.state.title, this.state.text)
    this.setState({
      title: '',
      text: ''    
    })
  }



  render() {
    const { abc } = this.props
    return <div>
              <p>Title<input type='text' onChange={(e) => this.setState({title: e.target.value})} value={this.state.title} /></p>
              <p>Text<textarea onChange={(e) => this.setState({text: e.target.value})} value={this.state.text} /></p>
              <button className='btn' onClick={this.addpostBlog.bind(this)}>Add post </button> 
              <BlogPosts posts={abc} delpost={this.props.delpost} searchpost={this.props.searchpost}/>
           </div>
  }

}


class BlogPosts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: ''
    }
  }

  search(e) {
    this.setState({
      search: e.target.value
    })
  }


  render() {
    const posts = this.props.posts.filter((post) => post.title.includes(this.state.search)).map((post) => (
      <div id={post.id} className='blogpost' >
        <p><b>Title:</b> {post.title}</p>
        <p><b>Date:</b> {post.date}</p>
        <p><b>Text:</b> {post.text}</p>
        <button className='btn' onClick={() => this.props.delpost(post.id)} >Delete post </button> 
        <br /><br /><br />
      </div>
      ))
    return <div>
            {posts}
            <input type='text' onChange={this.search.bind(this)}/>
          </div>
  }

}





function mapStateToProps(state) {
  return {
    abc: state.abc
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

// https://codepen.io/asepnorzai/pen/zqgzMz?editors=0011