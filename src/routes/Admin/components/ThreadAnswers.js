import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'


class ThreadAnswers extends Component {
      constructor(props) {
        super(props)
        this.state = {
          isHidden: true,
        }
      }

      toggleClick() {
        this.setState({
          isHidden: !this.state.isHidden,
        });
      }

      render() { 
        if (this.state.isHidden) {
          return <div className='mdl-card__actions mdl-card--border post-card__actions '>
            <button className="mdl-button mdl-button--raised mdl-js-ripple-effect" onClick={this.toggleClick.bind(this)}>
                Показать {this.props.posts.length} сообщений
            </button>
          </div>
        }
        return <div>
          <div className='mdl-card__actions mdl-card--border post-card__actions '>
              <button className="mdl-button mdl-button--raised mdl-js-ripple-effect" onClick={this.toggleClick.bind(this)}>Скрыть</button>
          </div>
        {this.props.posts.map(post =>
            <div key={post.number} className='demo-card-square mdl-card mdl-shadow--2dp mdl-cell mdl-cell--10-col ' id={'board-post__' + post.number}>
              <div className="mdl-card__title mdl-card--expand">
                <h2 className="mdl-card__title-text">{post.name}</h2>
                <h2 className="mdl-card__title-text"><a href={'#board-post__' + post.number}>{'#' + post.number}</a></h2>
              </div>
              <div className="mdl-card__supporting-text">
                {post.text} 
              </div>
              <div className="mdl-card__actions mdl-card--border post-card__actions">
                <div className="post__date">{post.date}</div>
              </div>
            </div>
          )}
        </div>
    }
  }




export default ThreadAnswers
