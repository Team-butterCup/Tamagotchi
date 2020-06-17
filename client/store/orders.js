import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER'
const REMOVE_ORDER = 'REMOVE_ORDER'

/**
 * INITIAL STATE
 */
const defaultOrder = {}

/**
 * ACTION CREATORS
 */
const getOrder = order => ({type: GET_ORDER, order})
const removeOrder = () => ({type: REMOVE_ORDER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getOrder(res.data || defaultOrder))
  } catch (err) {
    console.error(err)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeOrder())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultOrder, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    case REMOVE_ORDER:
      return defaultOrder
    default:
      return state
  }
}
