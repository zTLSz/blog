import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (

  <div className='mdl-layout__container'>
    <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header has-drawer is-upgraded">
      <header className="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600 is-casting-shadow">
        <div className="mdl-layout__header-row">
          <h1>Тестовый блог SPA</h1>
        </div>
      </header>
      <div className="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
        <nav className="demo-navigation mdl-navigation mdl-color--blue-grey-900">
          <IndexLink to='/' className='mdl-navigation__link' activeClassName='mdl-navigation__link__active'>
            Главная страница
          </IndexLink>
          {''}
          <Link to='/TestPage/' className='mdl-navigation__link'  activeClassName='mdl-navigation__link__active'>Страница описания</Link>
          {''}
          <Link to='/blog/'  className='mdl-navigation__link'  activeClassName='mdl-navigation__link__active'>Игра</Link>
          {''}
          <Link to='/board/' className='mdl-navigation__link'  activeClassName='mdl-navigation__link__active'>Текстовая борда</Link>
        </nav>
      </div>
      <div className='mdl-layout__content mdl-color--grey-50'>
        <div>
          {children}
        </div>
      </div>
      <div className="mdl-mini-footer">Footer</div>
    </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
