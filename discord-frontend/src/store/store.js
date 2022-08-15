import {composeWithDevTools}  from "redux-devtools-extension"
import {combineReducers, applyMiddleware, createStore} from "redux"
import thunk from 'redux-thunk'

import authReducer from './reduces/authReduce'
import alertReducer from './reduces/alertReducer'
import friendsReducer from './reduces/friendsReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  friends: friendsReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;