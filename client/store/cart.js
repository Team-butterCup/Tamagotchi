import axios from 'axios'

const GET_CART = 'GET_CART'
const SET_CART = 'SET_CART'

const getCart = cart => ({type: GET_CART, cart})
const setCart = cart => ({type: SET_CART, cart})

export const fetchCart = orderId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${orderId}`)
    dispatch(getCart(data))
  } catch (err) {
    console.error(err)
  }
}

export default function cartReducer(cart = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return cart
  }
}
