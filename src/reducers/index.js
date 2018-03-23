//import { combineReducers } from 'redux'
//import page from './page'
//import user from './user'

import {
		TEST_ACTION,
		DELETE_POST,
		SEARCH_POST
} from '../constants/Page'


export default function page(state = initstate, action) {

	switch (action.type) {
		case TEST_ACTION:
				return { 
					...state,
					abc: state.abc.concat(action.payload) 
				}
		case DELETE_POST: 
				return {
					abc: state.abc.filter(post => post.id !== action.payload)
				};
		case SEARCH_POST: 
				return {
					...state,
					abc: state.abc.filter(post => post.title.includes(action.payload))
				};
		default:
			return state
	}
}

/*
export default combineReducers({
  page,
  user
})
*/