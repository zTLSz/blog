import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

class Admin extends Component {
  constructor() {
    super(...arguments)
  }

  componentDidMount () {
    axios.get('../postsData')
      .then(res => {
        this.props.loginAction(res.data);
        return res.data;
      });
  }

/*
  componentDidUpdate () {
    axios.get('../postsData')
      .then(res => {
        this.props.loginAction(res.data);
        return res.data;
      });
  }
*/


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


  render() {
    const items = this.props.data.map((dataItem) => 
      <div key={dataItem._id} className="demo-card-square mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col" id={'board-post__' + dataItem.number}>
        <div className="mdl-card__title mdl-card--expand">
          <h2 className="mdl-card__title-text">{dataItem.name}</h2>
          <h2 className="mdl-card__title-text"><a href={'#board-post__' + dataItem.number}>{'#' + dataItem.number}</a></h2>
        </div>
        <div className="mdl-card__supporting-text">
          {dataItem.text}   
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <button className="mdl-button mdl-button--raised mdl-js-ripple-effect" onClick={() => { this.deleteNote(dataItem._id) } }>Удалить</button>
        </div>
      </div>);

    return <div className='mdl-grid board-post'>
            <NoteCreator createNote={this.createNote.bind(this)} loginAction={this.props.loginAction.bind(this)} />
            {items}
          </div>
  }
}

class NoteCreator extends Component {
    constructor(props) {
      super(props)
      this.state = {
        name: '',
        text: ''
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


    createNoteSubmit(e) {
      e.preventDefault();
      let newNote = {
        name: this.state.name,
        text: this.state.text
      }
      if (this.state.name === '') {
        newNote.name = 'Аноним'; 
      }
      if (this.state.text !== '') {
        this.props.createNote(newNote);
        this.setState({
          name: '',
          text: ''
        })
        return;
      }
    }



    render() {
      return <div className="demo-card-square mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col board-post__ed">
                <div className="mdl-card__title mdl-card--expand">
                  <h2 className="mdl-card__title-text">Добавить пост</h2>
                </div>
                <form>
                  <div className="mdl-card__supporting-text" >
                    <input type="text" className="mdl-textfield__input" rows= "3"  placeholder="Введите имя" 
                    value={this.state.name}
                    onChange={this.handleText.bind(this)} />
                    <textarea className="mdl-textfield__input" rows= "3"
                    value={this.state.text}
                    onChange={this.handleTextarea.bind(this)} 
                    placeholder="Введите текст" /> 
                  </div>
                  <div className="mdl-card__actions mdl-card--border">
                    <input type="submit" value="Добавить пост" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" 
                    onClick={(e) => { this.createNoteSubmit(e) } } />
                  </div>
                </form>
              </div>
    }
}




export default Admin
