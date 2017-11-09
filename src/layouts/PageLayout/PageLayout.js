import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (
  <div className='container text-center'>
    <h1>Тестовый блог SPA React+Redux</h1>
    <IndexLink to='/' activeClassName='page-layout__nav-item--active'>Home</IndexLink>
    {' · '}
    <Link to='/counter' activeClassName='page-layout__nav-item--active'>Counter</Link>
    {' · '}
    <Link to='/TestPage' activeClassName='page-layout__nav-item--active'>Главная страница</Link>
    {' · '}
    <Link to='/blog' activeClassName='page-layout__nav-item--active'>Блог (тестовая страница с  действиями)</Link>
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
