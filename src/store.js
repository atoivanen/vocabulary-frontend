import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import dictionaryReducer from './reducers/dictionaryReducer'
import wordReducer from './reducers/wordReducer'
import searchReducer from './reducers/searchReducer'
import notificationReducer from './reducers/notificationReducer'
import modalReducer from './reducers/modalReducer'
import newReducer from './reducers/newReducer'
import userReducer from './reducers/userReducer'
import chaptersReducer from './reducers/chaptersReducer'
import chapterReducer from './reducers/chapterReducer'
import myVocabularyReducer from './reducers/myVocabularyReducer'

const reducer = combineReducers({
  dictionary: dictionaryReducer,
  word: wordReducer,
  search: searchReducer,
  notification: notificationReducer,
  modal: modalReducer,
  new: newReducer,
  chapters: chaptersReducer,
  chapter: chapterReducer,
  user: userReducer,
  myVocabulary: myVocabularyReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
