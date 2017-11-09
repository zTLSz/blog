// ------------------------------------
// Constants
// ------------------------------------
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const SEARCH_POST = 'SEARCH_POST'

// ------------------------------------
// Actions
// ------------------------------------
export function add(title, text) {
  return (dispatch) => {  
      dispatch({
        type: ADD_POST,
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

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

/*
export const actions = {
  increment,
  doubleAsync
}

*/

// ------------------------------------
// Action Handlers
// ------------------------------------
/*
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]    : (state, action) => state + action.payload,
  [COUNTER_DOUBLE_ASYNC] : (state, action) => state * 2
}
*/

// ------------------------------------
// Reducer
// ------------------------------------
const initstate = {
  posts: [{
    id: 'id_' + Math.random().toString(36).substring(2, 7),
    title: 'Hello world',
    date: new Date().toLocaleString(),
    text: 'This is a first blog post!'
  }, {
    id: 'id_' + Math.random().toString(36).substring(2, 7),
    title: 'Hello world',
    date: new Date().toLocaleString(),
    text: 'This is a second blog post!'
  }]
}

export default function blogReducer(state = initstate, action) {

  switch (action.type) {
    case ADD_POST:
        return { 
          ...state,
          posts: state.posts.concat(action.payload) 
        }
    case DELETE_POST: 
        return {
          posts: state.posts.filter(post => post.id !== action.payload)
        };
    case SEARCH_POST: 
        return {
          ...state,
          posts: state.posts.filter(post => post.title.includes(action.payload))
        };
    default:
      return state
  }
}