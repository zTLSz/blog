import { TEST_ACTION, DELETE_POST, SEARCH_POST  } from '../constants/Page'


export function test(title, text) {
	return (dispatch) => {  
			dispatch({
				type: TEST_ACTION,
				payload: {
					id: 'id_' + Math.random().toString(36).substring(2, 7),
					title: title,
					date: new Date().toLocaleString(),
					text: text
				} 
			})
		}
} 

export function delpost(id) {
	return (dispatch) => {  
			dispatch({
				type: DELETE_POST,
				payload: id
			})
		}
} 

export function searchpost(title) {
	return (dispatch) => {  
			dispatch({
				type: SEARCH_POST,
				payload: title
			})
		}
}

