// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN = 'LOGIN'

// ------------------------------------
// Actions
// ------------------------------------
export function login() {
  return (dispatch) => {  
      dispatch({
        type: LOGIN,
        payload: 'admin'
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
const initstate = 'admin'

export default function blogReducer(state = initstate, action) {

  switch (action.type) {
    case LOGIN:
      return state
    default:
      return state
  }
}