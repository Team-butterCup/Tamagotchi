import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_REVIEWS = 'GET_REVIEWS'
const REMOVE_REVIEWS = 'REMOVE_REVIEWS'

/**
 * INITIAL STATE
 */
const defaultReviews = {}

/**
 * ACTION CREATORS
 */
const getReviews = reviews => ({type: GET_REVIEWS, reviews})
const removeReviews = () => ({type: REMOVE_REVIEWS})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getReviews(res.data || defaultReviews))
  } catch (err) {
    console.error(err)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeReviews())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultReviews, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
    case REMOVE_REVIEWS:
      return defaultReviews
    default:
      return state
  }
}
