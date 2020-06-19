import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_REVIEWS = 'GET_REVIEWS'
const REMOVE_REVIEWS = 'REMOVE_REVIEWS'

/**
 * INITIAL STATE
 */
const defaultReviews = []

/**
 * ACTION CREATORS
 */
const getReviews = reviews => ({type: GET_REVIEWS, reviews})
const removeReviews = () => ({type: REMOVE_REVIEWS})

/**
 * THUNK CREATORS
 */
export const fetchReviews = () => async dispatch => {
  try {
    const res = await axios.get('/api/reviews')
    dispatch(getReviews(res.data || defaultReviews))
  } catch (err) {
    console.error(err)
  }
}
export const postReview = review => async dispatch => {
  try {
    const res = await axios.post('/api/reviews', review)
    dispatch(getReviews(res.data || defaultReviews))
  } catch (err) {
    console.log('THERE WAS AN ERROR FOOL: ', err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultReviews, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return [...state, ...action.reviews]
    case REMOVE_REVIEWS:
      return defaultReviews
    default:
      return state
  }
}
