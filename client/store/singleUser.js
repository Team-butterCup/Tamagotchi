import axios from 'axios'

const SET_SINGLEUSER = 'SET_SINGLEUSER'

const setSingleUser = user => {
  return {
    type: SET_SINGLEUSER,
    user
  }
}

export const fetchSingleUser = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}`)
      dispatch(setSingleUser(data))
    } catch (err) {
      console.log('Error fetching single user', err)
    }
  }
}

export default function singleUserReducer(user = {}, action) {
  switch (action.type) {
    case SET_SINGLEUSER: {
      return action.user
    }
    default:
      return user
  }
}
