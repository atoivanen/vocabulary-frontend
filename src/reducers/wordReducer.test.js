import deepFreeze from 'deep-freeze'

import wordReducer, { createWord, setWord, resetWord } from './wordReducer'

describe('wordReducer', () => {
  test('returns new word with function createWord', () => {
    const state = {}
    deepFreeze(state)
    const newState = wordReducer(state, createWord())

    expect(newState.lemma).toBeDefined()
  })

  test('returns word with function setWord', () => {
    const state = {}
    const word = { lemma: 'je', translation: 'minä' }
    deepFreeze(state)
    const newState = wordReducer(state, setWord(word))

    expect(newState.lemma).toBe(word.lemma)
    expect(newState.translation).toBe(word.translation)
  })

  test('returns empty word with function resetWord', () => {
    const state = { lemma: 'je', translation: 'minä' }
    deepFreeze(state)
    const newState = wordReducer(state, resetWord())

    expect(newState.lemma).toBe('')
  })
})
