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

const removeTamagotchi = tamagotchiId => ({
  type: REMOVE_TAMAGOTCHI,
  tamagotchiId
})

const addTamagotchi = newTamagotchi => ({
  type: ADD_TAMAGOTCHI,
  newTamagotchi
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

export const addTamagotchiThunk = newTamagotchi => {
  return async dispatch => {
    try {
      const {data: addedTamagotchi} = await axios.post(
        '/api/tamagotchis/',
        newTamagotchi
      )
      dispatch(addTamagotchi(addedTamagotchi))
    } catch (err) {
      console.log('Error adding tamagotchi', err)
    }
  }
}

export const deleteTamagotchiThunk = tamagotchiId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/tamagotchis/${tamagotchiId}`)
      dispatch(removeTamagotchi(tamagotchiId))
    } catch (err) {
      console.log('Error deleting tamagotchi', err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultTamagotchis, action) {
  switch (action.type) {
    case SET_TAMAGOTCHIS:
      return action.tamagotchis
    case REMOVE_TAMAGOTCHI:
      return state.filter(tamagotchi => tamagotchi.id !== action.tamagotchiId)
    case ADD_TAMAGOTCHI:
      return [...state, action.newTamagotchi]
    default:
      return state
  }
}
