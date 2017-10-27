import {
  TEST_ACTION, ADD_BLOG_POST, DELETE_BLOG_POST
} from '../constants/Page'
import { posts } from '../actions/PageActions'

/*
const initialState = {
  name: 'Аноним',
	n: 0
}
*/

export default function user(state = posts.articles, action) {

  switch (action.type) {
	case TEST_ACTION:
		return { ...state, n: action.payload }
	case ADD_BLOG_POST:
		return [action.payload, ...state];
	case DELETE_BLOG_POST:
		return state.filter(post => post.id !== action.payload);

    default:
      return state;
  }
}
