import React, { Component } from 'react'
import './TestPage.scss'





class TestPage extends Component {
	render() {
		const { posts } = this.props
		return <div className="mdl-grid demo-content">
         			<div className="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--12-col">
         				Тестовая страница с описанием версий
         			</div>
    			</div>
	}
}

export default TestPage
