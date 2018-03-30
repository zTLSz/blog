import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

class Admin extends Component {
  constructor() {
    super(...arguments)
  }


  // get posts from server
  componentDidMount () {
    axios.get('../postsData')
      .then(res => {
        this.props.loginAction(res.data);
        return res.data;
      });
  }


  deleteNote(id) {
     axios.delete('/postsData/' + id)
      .then(res => {
        this.props.loginAction(res.data);
        return res.data;
      });   
  }

  createNote(data) {
    axios.post('../postsData', data)
      .then(res => {
        this.props.loginAction(res.data);
        return res.data;
      });
  }

  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#9e';
    for (var i = 2; i < 6; i++) {
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
        this.props.loginAction(res.data);
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
          </div>
          <div className="post__date">{dataItem.date}</div>
        </div>
        <ThreadAnswers posts={dataItem.threadPosts} />
        { dataItem.isThread &&
        <NoteCreator createNote={this.createNote.bind(this)} isAnswer={true} 
        isAnswerFor={dataItem.number}
        loginAction={this.props.loginAction.bind(this)} />}
      </div>
      );

    return <div className='mdl-grid board-post'>
            <NoteCreator createNote={this.createNote.bind(this)} isAnswer={false} 
            loginAction={this.props.loginAction.bind(this)} />
            {items}
          </div>
  }
}

class NoteCreator extends Component {
    constructor(props) {
      super(props)
      this.state = {
        name: '',
        text: '',
        isText: true,
        isHidden: true,
      }
    }

    handleText(event) {
      this.setState({
        name: event.target.value,
      });
    }

    handleTextarea(event) {
      this.setState({
        text: event.target.value,
      });
    }

    toggleClick() {
        this.setState({
          isHidden: !this.state.isHidden,
        });
      }    


    createNoteSubmit(e) {
      e.preventDefault();
      let newNote = {
        name: this.state.name,
        text: this.state.text,
        isThread: true
      }
      if (this.props.isAnswer) {
        newNote.isThread = false;
        newNote.threadNumber = this.props.isAnswerFor;
      }
      if (this.state.name === '') {
        newNote.name = 'Аноним'; 
      }
      if (this.state.text === '') {
        this.setState({
          isText: false,
        });
      }
      if (this.state.text !== '') {
        this.props.createNote(newNote);
        this.setState({
          name: '',
          text: '',
          isText: true,
        })
        return;
      }
    }



    render() {
      let formAnswer;
        if (this.props.isAnswer) {
          formAnswer = 'В тред № ' + this.props.isAnswerFor;
        } else {
          formAnswer = '';
        }
       if (this.state.isHidden) {
          return <div className='mdl-card__actions mdl-card--border post-card__actions '>
            <button className="mdl-button mdl-button--raised mdl-js-ripple-effect" onClick={this.toggleClick.bind(this)}>
                Ответить
            </button>
          </div>
        }
      return <div className="demo-card-square mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col board-post__ed">
                <div className="mdl-card__title mdl-card--expand">
                  <h2 className="mdl-card__title-text">Добавить пост</h2>
                </div>
                <form>
                  <div className="mdl-card__supporting-text" >
                    <input type="text" className="mdl-textfield__input" placeholder="Ответить в тему №" 
                    value={formAnswer} disabled />
                    <input type="text" className="mdl-textfield__input" rows= "3"  placeholder="Введите имя" 
                    value={this.state.name}
                    onChange={this.handleText.bind(this)} />
                    <textarea className="mdl-textfield__input" rows= "3"
                    value={this.state.text}
                    onChange={this.handleTextarea.bind(this)} 
                    placeholder="Введите текст *" /> 
                  </div>
                  <div className="mdl-card__actions mdl-card--border">
                    <input type="submit" value="Добавить пост" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" 
                    onClick={(e) => { this.createNoteSubmit(e) } } />
                  </div>
                  <div className="mdl-card__actions mdl-card--border post-form__error">
                    {!this.state.isText && 
                      'Ошибка! Введите текст'}
                  </div>
                </form>
                <div className='mdl-card__actions mdl-card--border post-card__actions '>
                  <button className="mdl-button mdl-button--raised mdl-js-ripple-effect" onClick={this.toggleClick.bind(this)}>
                      Скрыть форму ответа
                  </button>
                </div>
              </div>
    }
}


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




export default Admin
