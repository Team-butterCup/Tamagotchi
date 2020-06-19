import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const REMOVE_ORDER = 'REMOVE_ORDER'
const CREATE_ORDER = 'CREATE_ORDER'
const GET_ORDER = 'GET_ORDER'

/**
 * INITIAL STATE
 */
const defaultOrder = []

/**
 * ACTION CREATORS
 */
const getOrders = orders => ({type: GET_ORDERS, orders})
const removeOrder = orderId => ({type: REMOVE_ORDER, orderId})
const createOrder = order => ({type: CREATE_ORDER, order})
const getOrder = order => ({type: GET_ORDER, order})

/**
 * THUNK CREATORS
 */
export const fetchOrders = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders')
    dispatch(getOrders(data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchSingleOrder = orderId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${orderId}`)
    dispatch(getOrder(data))
  } catch (err) {
    console.error(err)
  }
}

export const createOrderThunk = newOrder => async dispatch => {
  try {
    const {data} = await axios.post('/api/orders', newOrder)
    dispatch(createOrder(data))
  } catch (err) {
    console.error(err)
  }
}

export const removeOrderThunk = orderId => async dispatch => {
  try {
    await axios.delete(`/api/orders/${orderId}`)
    dispatch(removeOrder(orderId))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function orderReducer(state = defaultOrder, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case GET_ORDER:
      return action.order
    case REMOVE_ORDER:
      return state.filter(order => order.id !== action.orderId)
    case CREATE_ORDER:
      return [...state, action.order]
    default:
      return state
  }
}
