import {composeWithDevTools}  from "redux-devtools-extension"
import {combineReducers, applyMiddleware, createStore} from "redux"
import thunk from 'redux-thunk'

import authReducer from './reduces/authReduce'

const rootReducer = combineReducers({
  auth: authReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;