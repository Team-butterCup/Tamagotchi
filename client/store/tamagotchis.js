import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_TAMAGOTCHIS = 'SET_TAMAGOTCHIS'
const REMOVE_TAMAGOTCHI = 'REMOVE_TAMAGOTCHI'
const ADD_TAMAGOTCHI = 'ADD_TAMAGOTCHI'

/**
 * INITIAL STATE
 */
const defaultTamagotchis = []

/**
 * ACTION CREATORS
 */
const setTamagotchis = tamagotchis => ({
  type: SET_TAMAGOTCHIS,
  tamagotchis
})

const removeTamagotchi = () => ({
  type: REMOVE_TAMAGOTCHI
})

const addTamagotchi = () => ({
  type: ADD_TAMAGOTCHI
})

//promisified delay function

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * THUNK CREATORS
 */

export const fetchTamagotchis = () => async dispatch => {
  try {
    //await timeout(3000)
    const {data} = await axios.get('/api/tamagotchis')
    dispatch(setTamagotchis(data))
  } catch (error) {
    console.log('THERE WAS AN ERROR FOOL: ', error)
  }
}
// export const me = () => async dispatch => {
//   try {
//     const res = await axios.get('/auth/me')
//     dispatch(getTamagotchi(res.data || defaultTamagotchi))
//   } catch (err) {
//     console.error(err)
//   }
// }

// export const logout = () => async dispatch => {
//   try {
//     await axios.post('/auth/logout')
//     dispatch(removeTamagotchi())
//     history.push('/login')
//   } catch (err) {
//     console.error(err)
//   }
// }

/**
 * REDUCER
 */
export default function(state = defaultTamagotchis, action) {
  switch (action.type) {
    case SET_TAMAGOTCHIS:
      return action.tamagotchis
    case REMOVE_TAMAGOTCHI:
      return defaultTamagotchis
    case ADD_TAMAGOTCHI:
      return defaultTamagotchis
    default:
      return state
  }
}
