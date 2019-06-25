import deepFreeze from 'deep-freeze'

import dictionaryReducer, {
  addWordToDictionary,
  updateDictionary
} from './dictionaryReducer'

describe('dictionaryReducer', () => {
  test('adds new word with function addWordToDictionary', () => {
    const state = []
    const word = { id: 1, lemma: 'je', translation: 'minä' }
    deepFreeze(state)
    const newState = dictionaryReducer(state, addWordToDictionary(word))

    expect(newState).toContainEqual(word)
  })

  test('updates word with function updateDictionary', () => {
    const state = [{ id: 1, lemma: 'je', translation: 'minä' }]
    const word = { id: 1, lemma: 'il', translation: 'hän' }
    deepFreeze(state)
    const newState = dictionaryReducer(state, updateDictionary(word))

    expect(newState[0].lemma).toBe(word.lemma)
    expect(newState[0].translation).toBe(word.translation)
  })
})
