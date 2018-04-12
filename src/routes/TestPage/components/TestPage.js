import React, { Component } from 'react'
import './TestPage.scss'





class TestPage extends Component {
	render() {
		const { posts } = this.props
		const date = new Date();
		return <div className="mdl-grid demo-content">
         			<div className="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--12-col">
         				<b>Это всего лишь личный бложик/пет проджет</b><br />
         				<p>Что реализовано на данный момент ({ date.toLocaleString() })</p>
         				<ul>
         					<li>
         						4 отдельные страницы роутингом, две статичные, две динамические, дизайн MDL lite
         					</li>
         					<li>
         						<b>Страница "Игра" (возможно будет скрыта):</b> сырой вариант clicker heroes без графики, использован React + Redux, сохранение игры в localstorage
         					</li>
         					<li>
         						<b>Страница "Текстовая борда":</b> небольшая анонимная гостевуха-текстовая доска<br /> 
         						<b>Реализовано:</b> создание новых тем, ответы, автосортировка от новых к старым, 
         						самоудаление старых тредов, лимиты комментариев. Все сохраняется сервером в БД, берется оттуда же. В планах ответы и админка.<br /> 
         						<b>Технологии:</b> <ul>
         												<li>React</li>
         												<li>Redux</li>
         												<li>Node.js</li>
         												<li>Express</li>
         												<li>Mongo</li>
         											</ul>
         					</li>
         				</ul>
         			</div>
    			</div>
	}
}

export default TestPage
