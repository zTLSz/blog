import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Admin extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      logged: false
    }
  }


  handleSubmit(e) {
    e.preventDefault()
    const value = e.target.elements[0].value
    const password = e.target.elements[1].value
    window.localStorage.setItem('login', value)
    window.localStorage.setItem('password', password)
    console.log(window.localStorage)
  }

  logout() {
    window.localStorage.clear();
  }

  render() {
    const { login } = this.props
    let isAdmin = window.localStorage.getItem('login');
    let isPass = window.localStorage.getItem('password');

    let isLogged;

    if ((isAdmin === 'admin') && (isPass === 'admin')) {
      isLogged = <div><button className='btn' type='submit' onClick={this.logout.bind(this)}>Выйти</button></div>
    } else {
      isLogged = <div>
                  <form className='col-md-4' onSubmit={this.handleSubmit.bind(this)}>
                    <input type='text' placeholder='login'/>
                    <input type='password' placeholder='Password'/>
                    <button className='btn' type='submit'>Войти</button>
                  </form>
                </div>
    }

    return <div className='row'>
          {isLogged}
    </div>
  }
}




export default Admin
