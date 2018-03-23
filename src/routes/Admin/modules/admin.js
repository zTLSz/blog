
// ------------------------------------
// Constants
// ------------------------------------
export const GET_DATA = 'GET_DATA'


// ------------------------------------
// Actions
// ------------------------------------



export function addData(data) {
  return (dispatch) => {  
      dispatch({
        type: GET_DATA,
        payload: data
      })
    }
}


 



// ---------------------------------------
// Reducer
// ------------------------------------
const initstate = {
  data: [],
};

export default function blogReducer(state = initstate, action) {

  switch (action.type) {
    case GET_DATA:
      console.log(action.payload)
      return {
        ...state,
        data: action.payload,
      }
    default:
      return state
  }
}