
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
      // sort threads by date
      const dataSorted = action.payload.sort(function(a, b) {
        if ((b.threadPosts.length > 0) && (a.threadPosts.length > 0)) {
          return a.threadPosts[a.threadPosts.length - 1].dateMs - b.threadPosts[b.threadPosts.length - 1].dateMs
        }
        if ((b.threadPosts.length == 0) && (a.threadPosts.length > 0)) {
          return a.threadPosts[a.threadPosts.length - 1].dateMs - b.dateMs
        }
        if ((b.threadPosts.length > 0) && (a.threadPosts.length == 0)) {
          return a.dateMs - b.threadPosts[b.threadPosts.length - 1].dateMs
        }
        if ((b.threadPosts.length == 0) && (a.threadPosts.length == 0)) {
          return a.dateMs - b.dateMs;
        }
      }).reverse();

      return {
        ...state,
        data: dataSorted,
      }
    default:
      return state
  }
}