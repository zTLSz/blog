import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import NoteCreator from './NoteCreator'
import ThreadAnswers from './ThreadAnswers'

class MainBoard extends Component {
  constructor() {
    super(...arguments)
  }


  // get posts from server
  componentDidMount () {
    axios.get('../postsData')
      .then(res => {
        this.props.getData(res.data);
        return res.data;
      });
  }


  deleteNote(id) {
     axios.delete('/postsData/' + id)
      .then(res => {
        this.props.getData(res.data);
        return res.data;
      });   
  }

  createNote(data) {
    axios.post('../postsData', data)
      .then(res => {
        this.props.getData(res.data);
        return res.data;
      });
  }

  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#9e';
    for (let i = 2; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  openThread(arr) {
    const openThreadData = {
      isOpeningThread: true,
      data: arr
    }
    axios.post('../postsData', openThreadData)
      .then(res => {
        this.props.getData(res.data);
        return res.data;
    });
  }



  render() {
    const items = this.props.data.map((dataItem) => 
      <div key={dataItem._id} className='mdl-cell--12-col demo-card-square mdl-card mdl-shadow--2dp mdl-cell' id={'board-post__' + dataItem.number}>
        <div className="mdl-card__title mdl-card--expand" style={{backgroundColor: this.getRandomColor()}}>
          <h2 className="mdl-card__title-text">{dataItem.name}</h2>
          <h2 className="mdl-card__title-text"><a href={'#board-post__' + dataItem.number}>{'#' + dataItem.number}</a></h2>
        </div>
        <div className="mdl-card__supporting-text">
          {dataItem.text} 
        </div>
        <div className="mdl-card__actions mdl-card--border post-card__actions">
          <div className="posts_button">
            <button className="mdl-button mdl-button--raised mdl-js-ripple-effect" onClick={() => { this.deleteNote(dataItem._id) } }>Удалить</button>
            {dataItem.threadPosts.length > 19 ? 'Превышено максимальное количество сообщений!' : '' }
          </div>
          <div className="post__date">{dataItem.date}</div>
        </div>
        <ThreadAnswers posts={dataItem.threadPosts} />
        { (dataItem.isThread && (dataItem.threadPosts.length <= 19)) &&
        <NoteCreator createNote={this.createNote.bind(this)} isAnswer={true} 
        isAnswerFor={dataItem.number}
        loginAction={this.props.getData.bind(this)} />}
      </div>
      );

    return <div className='mdl-grid board-post'>
            <NoteCreator createNote={this.createNote.bind(this)} isAnswer={false} 
            loginAction={this.props.getData.bind(this)} />
            {items}
          </div>
  }
}



export default MainBoard
