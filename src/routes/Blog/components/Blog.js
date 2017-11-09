import React, { Component } from 'react'
import PropTypes from 'prop-types'

/*
export const Counter = ({ counter, increment, doubleAsync }) => (
  <div style={{ margin: '0 auto' }} >
    <h2>Counter: {counter}</h2>
    <button className='btn btn-primary' onClick={increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-secondary' onClick={doubleAsync}>
      Double (Async)
    </button>
  </div>
)
Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  doubleAsync: PropTypes.func.isRequired,
}
*/

class Blog extends Component {
  render() {
    const { posts } = this.props
    const { addAction } = this.props
    const { delAction } = this.props
    const { searchAction } = this.props
   // const { addPost  } = this.props.pageActions.Actions

    return <div className='row'>
        <BlogWrap add={addAction} posts={posts} delpost={delAction} searchpost={searchAction}/>
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
    this.props.add(this.state.title, this.state.text)
    this.setState({
      title: '',
      text: ''    
    })
  }



  render() {
    const { posts } = this.props
    return <div className="blog-wrap">
              <h4>Тут небольшой блог с добавлением и удалением постов. </h4>
              <p>Title<input type='text' onChange={(e) => this.setState({title: e.target.value})} value={this.state.title} /></p>
              <p>Text<textarea onChange={(e) => this.setState({text: e.target.value})} value={this.state.text} /></p>
              <button className='btn' onClick={this.addpostBlog.bind(this)}>Add post </button> 
              <BlogPosts posts={posts} delpost={this.props.delpost} searchpost={this.props.searchpost}/>
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
            <p>Поиск по сообщениям</p>
            <input type='text' onChange={this.search.bind(this)}/>
            <p><h3>Сообщения</h3></p>
            {posts}
          </div>
  }

}




export default Blog
