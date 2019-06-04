import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import wordsReducer from './reducers/wordsReducer'
import wordReducer from './reducers/wordReducer'
import searchReducer from './reducers/searchReducer'
import notificationReducer from './reducers/notificationReducer'
import modalReducer from './reducers/modalReducer'
import newReducer from './reducers/newReducer'

const reducer = combineReducers({
  words: wordsReducer,
  word: wordReducer,
  search: searchReducer,
  notification: notificationReducer,
  modal: modalReducer,
  new: newReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
