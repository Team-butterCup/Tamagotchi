import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const SET_USERS = 'SET_USERS'
const REMOVE_SINGLE_USER = 'REMOVE_SINGLE_USER'

/**
 * INITIAL STATE
 */
const defaultUsers = []

/**
 * ACTION CREATORS
 */
const setUsers = users => ({type: SET_USERS, users})
const removeSingleUser = userId => ({type: REMOVE_SINGLE_USER, userId})

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

export const deleteUser = userId => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/users/${userId}`)
    dispatch(removeSingleUser(userId))
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
    case REMOVE_SINGLE_USER:
      return state.filter(user => user.id !== action.userId)
    default:
      return state
  }
}
