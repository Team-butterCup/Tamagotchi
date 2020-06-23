import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const SET_USERS = 'SET_USERS'

/**
 * INITIAL STATE
 */
const defaultUsers = []

/**
 * ACTION CREATORS
 */
const setUsers = users => ({type: SET_USERS, users})

/**
 * THUNK CREATORS
 */
export const fetchUsers = () => async dispatch => {
  try {
    //await timeout(3000)
    const {data} = await axios.get('/api/users')
    dispatch(setUsers(data))
  } catch (error) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUsers, action) {
  switch (action.type) {
    case SET_USERS:
      return action.users
    default:
      return state
  }
}
