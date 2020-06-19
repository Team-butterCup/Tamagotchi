import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_REVIEWS = 'GET_REVIEWS'
const REMOVE_REVIEWS = 'REMOVE_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'

/**
 * INITIAL STATE
 */
const defaultReviews = []

/**
 * ACTION CREATORS
 */
const getReviews = reviews => ({type: GET_REVIEWS, reviews})
const addReview = review => ({type: ADD_REVIEW, review})
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
    console.log(res.data)
    dispatch(addReview(res.data))
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
    case ADD_REVIEW:
      return [...state, action.review]
    case REMOVE_REVIEWS:
      return defaultReviews
    default:
      return state
  }
}
