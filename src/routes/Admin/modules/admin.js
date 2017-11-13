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