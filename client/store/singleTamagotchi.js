import axios from 'axios'

const SET_SINGLETAMAGOTCHI = 'SET_SINGLETAMAGOTCHI'

const setSingleTamagotchi = tamagotchi => {
  return {
    type: SET_SINGLETAMAGOTCHI,
    tamagotchi
  }
}

export const fetchSingleTamagotchi = tamagotchiId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/tamagotchis/${tamagotchiId}`)
      dispatch(setSingleTamagotchi(data))
    } catch (err) {
      console.log('Error fetching single tamagotchi', err)
    }
  }
}

export default function singleTamagotchiReducer(tamagotchi = {}, action) {
  switch (action.type) {
    case SET_SINGLETAMAGOTCHI: {
      return action.tamagtochi
    }
    default:
      return tamagotchi
  }
}
