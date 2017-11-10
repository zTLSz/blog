import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

function checkLogin() {
  const login = window.localStorage.getItem('login')
  const password = window.localStorage.getItem('password')
  if (login === 'admin' && password === 'admin') {
    console.log('пропусти')
  }
}

export const PageLayout = ({ children }) => (

  <div className='container text-center'>
    <h1>Тестовый блог SPA React+Redux</h1>
    <IndexLink to='/' activeClassName='page-layout__nav-item--active'>Главная страница</IndexLink>
    {' · '}
    <Link to='/TestPage' activeClassName='page-layout__nav-item--active'>Страница описания</Link>
    {' · '}
    <Link to='/blog' activeClassName='page-layout__nav-item--active'>Блог (тестовая страница с  действиями)</Link>
    {' · '}
    <Link to='/admin' activeClassName='page-layout__nav-item--active' onEnter={checkLogin()}>Войти</Link>
    <div className='page-layout__viewport'>
      {children}
    </div>
    <div className="footer">Footer</div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
