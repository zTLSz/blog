import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import ThreadAnswers from './ThreadAnswers'

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
                    <input type="text" className="mdl-textfield__input" placeholder="Создать новую тему" 
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







export default NoteCreator
