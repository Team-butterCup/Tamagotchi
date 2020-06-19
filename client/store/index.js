import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import orders from './orders'
import reviews from './reviews'
import tamagotchis from './tamagotchis'
import singleTamagotchi from './singleTamagotchi'
import cart from './cart'
import reviewDraft from './reviewDraft'


const reducer = combineReducers({
  user,
  orders,
  reviews,
  tamagotchis,
  singleTamagotchi,
  cart,
  reviewDraft
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './orders'
export * from './reviews'
export * from './tamagotchis'
export * from './singleTamagotchi'
export * from './cart'
export * from './reviewDraft'

