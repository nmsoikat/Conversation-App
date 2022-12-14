import { composeWithDevTools } from "redux-devtools-extension"
import { combineReducers, applyMiddleware, createStore } from "redux"
import thunk from 'redux-thunk'

import authReducer from './reduces/authReduce'
import alertReducer from './reduces/alertReducer'
import friendsReducer from './reduces/friendsReducer'
import chatReducer from './reduces/chatReducer'
import roomReducer from './reduces/roomReducer'
import controlBarReducer from './reduces/controlBarReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  friends: friendsReducer,
  chat: chatReducer,
  room: roomReducer,
  controlBar: controlBarReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;