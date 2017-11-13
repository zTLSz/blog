import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Admin extends Component {
  constructor() {
    super(...arguments)
    let isAdmin = window.localStorage.getItem('login');
    let isPass = window.localStorage.getItem('password');

    if ((isAdmin === 'admin') && (isPass === 'admin')) {
      this.state = {
        logged: true
      }
    } else {
      this.state = {
        logged: false
      }
    }
  }


  handleSubmit(e) {
    e.preventDefault()
    const value = e.target.elements[0].value
    const password = e.target.elements[1].value
    window.localStorage.setItem('login', value)
    window.localStorage.setItem('password', password)
    if ((value === 'admin') && (password === 'admin')) {
      this.setState({
        logged: true    
      })
    }
  }

  logout() {
    window.localStorage.clear();
    this.setState({
        logged: false    
    })
  }

  render() {
    const { login } = this.props
    let isAdmin = window.localStorage.getItem('login');
    let isPass = window.localStorage.getItem('password');

    let isLogged;

    if ((isAdmin === 'admin') && (isPass === 'admin') && (this.state.logged)) {
      isLogged = <div><button className='btn' type='submit' onClick={this.logout.bind(this)}>Выйти</button></div>
    } else if ((isAdmin !== 'admin') && (isPass !== 'admin') && (this.state.logged == false)) {
      isLogged = <div>
                  <form className='col-md-3' onSubmit={this.handleSubmit.bind(this)}>
                    <input type='text' placeholder='login'/>
                    <input type='password' placeholder='Password'/>
                    <button className='btn' type='submit'>Войти</button>
                  </form>
                </div>
    }

    return <div className='row'>
        <div className='login-form'>
          {isLogged}
        </div>
    </div>
  }
}




export default Admin
