import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_TAMAGOTCHI = 'GET_TAMAGOTCHI'
const REMOVE_TAMAGOTCHI = 'REMOVE_TAMAGOTCHI'

/**
 * INITIAL STATE
 */
const defaultTamagotchi = []

/**
 * ACTION CREATORS
 */
const getTamagotchi = tamagotchi => ({type: GET_TAMAGOTCHI, tamagotchi})
const removeTamagotchi = () => ({type: REMOVE_TAMAGOTCHI})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getTamagotchi(res.data || defaultTamagotchi))
  } catch (err) {
    console.error(err)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeTamagotchi())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultTamagotchi, action) {
  switch (action.type) {
    case GET_TAMAGOTCHI:
      return action.tamagotchi
    case REMOVE_TAMAGOTCHI:
      return defaultTamagotchi
    default:
      return state
  }
}
