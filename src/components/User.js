import React, { PropTypes, Component } from 'react'

export default class User extends Component {
	test() {
		this.props.testAction();
	}
  render() {
    const { name, n } = this.props
    return <div className='ib user'>
      <p>Привет, {name} !</p>
      <button className='btn' onClick={::this.test}>2016 {n} </button>
    </div>
  }
}

User.propTypes = {
  name: PropTypes.string.isRequired
}
