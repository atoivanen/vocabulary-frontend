import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import WordDetails from './WordDetails'
import wordReducer, { setWord } from '../../../reducers/wordReducer'
import modalReducer, { openModal } from '../../../reducers/modalReducer'
import notificationReducer from '../../../reducers/notificationReducer'

afterEach(cleanup)

test('renders content', () => {
  const word = {
    'id': 262387,
    'lemma': 'écrire',
    'token': 'écris',
    'translation': 'kirjoittaa, laatia',
    'pos': 'VERB',
    'gender': null
  }

  const reducer = combineReducers({
    word: wordReducer,
    modal: modalReducer,
    notification: notificationReducer
  })

  const store = createStore(reducer, applyMiddleware(thunk))

  store.dispatch(setWord(word))
  store.dispatch(openModal())

  const component = render(
    <Provider store={store}>
      <WordDetails />
    </Provider>
  )

  const wordInput = component.getByDisplayValue('écrire')
  expect(wordInput).toBeDefined()

  const translationInput = component.getByDisplayValue('kirjoittaa, laatia')
  expect(translationInput).toBeDefined()

  const posInput = component.getByDisplayValue('VerbOption')
  expect(posInput).toBeDefined()
})