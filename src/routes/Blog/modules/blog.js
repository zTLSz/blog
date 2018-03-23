// ------------------------------------
// Constants
// ------------------------------------
export const ATTACK = 'ATTACK'
export const BUY_CLICKER_1 = 'BUY_CLICKER_1'
export const BUY_CLICKER_2 = 'BUY_CLICKER_2'
export const CLICKER_WORKS = 'CLICKER_WORKS'
export const SAVE = 'SAVE'
export const LOAD = 'LOAD'
// ------------------------------------
// Actions
// ------------------------------------


export function attack() {
  return (dispatch) => {  
      dispatch({
        type: ATTACK,
        payload: 1
      })
    }
} 

export function bc1() {
  return (dispatch) => {  
      dispatch({
        type: BUY_CLICKER_1,
        payload: 1
      })
    }
}

export function bc2() {
  return (dispatch) => {  
      dispatch({
        type: BUY_CLICKER_2,
        payload: 25
      })
    }
}

export function cw1() {
  return (dispatch) => {  
      dispatch({
        type: CLICKER_WORKS,
        payload: 1
      })
    }
}  

export function save() {
  return (dispatch) => {  
      dispatch({
        type: SAVE
      })
    }
}  

export function load() {
  return (dispatch) => {  
      dispatch({
        type: LOAD
      })
    }
}  


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


const initstate  = {
      gold: 10,
      kills: 1, 
      level: 0,
      health: 10,
      clicker_1: {
        amount: 0,
        start_cost: 1,
        curr_cost: 1,
        atk_dmg: 1
      },
      clicker_2: {
        amount: 0,
        start_cost: 10,
        curr_cost: 10,
        atk_dmg: 25
      }
  }


export default function blogReducer(state = initstate, action) {

  switch (action.type) {
    case ATTACK:
        if ((state.health < 0) || (state.health < action.payload + state.clicker_1.amount*state.clicker_1.atk_dmg) 
            || (state.health < action.payload + state.clicker_2.amount*state.clicker_2.atk_dmg)) {
            const DEFAULT_HEALTH = 10 + state.kills*100
            return {
                ...state,
                kills: state.kills + action.payload,
                gold: 10 + state.kills * (state.kills - 1),
                health: DEFAULT_HEALTH
            };
        } else {
            const REFRESH_HEALTH = state.health - action.payload - state.clicker_1.amount*state.clicker_1.atk_dmg - state.clicker_2.amount*state.clicker_2.atk_dmg
            return {
                ...state,
                health: REFRESH_HEALTH
            };
        }

      case BUY_CLICKER_1:
        const COST = state.clicker_1.start_cost + state.clicker_1.curr_cost
        if (state.gold - COST >= 0)
        return {
          ...state,
          gold: state.gold - COST,
          clicker_1: {
            amount: state.clicker_1.amount + 1,
            start_cost: state.clicker_1.start_cost,
            curr_cost: COST,
            atk_dmg: state.clicker_1.atk_dmg
          }
        }

      case BUY_CLICKER_2:
        const COST_2 = state.clicker_2.start_cost + state.clicker_2.curr_cost
        if (state.gold - COST_2 >= 0)
        return {
          ...state,
          gold: state.gold - COST_2,
          clicker_2: {
            amount: state.clicker_2.amount + 1,
            start_cost: state.clicker_2.start_cost,
            curr_cost: COST_2,
            atk_dmg: state.clicker_2.atk_dmg
          }
        }

      case CLICKER_WORKS:
        return {
          ...state,
          health: state.health - state.clicker_1.amount,
        }

      case SAVE:
        const saveState = JSON.stringify(state);
        localStorage.setItem("clickerGame", saveState);
        return {
          ...state
        }
        
      case LOAD: 
        const loadState = JSON.parse(localStorage.getItem("clickerGame"));
        state = loadState;
        return {
          ...state
        }
    default:
      return state
  }
}