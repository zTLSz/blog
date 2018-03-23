import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'

export const HomeView = () => (
	<div className='mdl-grid demo-content'>
	  <div className='demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col home--page'>
	  	<div className="mdl-card__title">
	    	<h4 className="mdl-card__title-text mdl-typography--text-center">Главная страница будет здесь</h4>
	    </div>
	    <div className="mdl-card__supporting-text">
		    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		    Mauris sagittis pellentesque lacus eleifend lacinia.
		    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		    Mauris sagittis pellentesque lacus eleifend lacinia
		    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		    Mauris sagittis pellentesque lacus eleifend lacinia...
	  	</div>
	    <img alt='This is a duck, because Redux!' className='duck' src={DuckImage} />
	  </div>
	</div>
)

export default HomeView
