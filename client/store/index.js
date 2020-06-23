import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import ordersAndCart from './orders'
import reviews from './reviews'
import tamagotchis from './tamagotchis'
import singleTamagotchi from './singleTamagotchi'
import singleUser from './singleUser'
import reviewDraft from './reviewDraft'
import users from './users'
const reducer = combineReducers({
  user,
  users,
  singleUser,
  ordersAndCart,
  reviews,
  tamagotchis,
  singleTamagotchi,
  reviewDraft
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './users'
export * from './orders'
export * from './reviews'
export * from './tamagotchis'
export * from './singleTamagotchi'
export * from './reviewDraft'
export * from './singleUser'
