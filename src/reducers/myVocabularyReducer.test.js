import deepFreeze from 'deep-freeze'

import myVocabularyReducer, {
  addWordToMyVocabulary,
  updateMyVocabulary,
  removeWordFromMyVocabulary,
  resetMyVocabulary
} from './myVocabularyReducer'

describe('myVocabularyReducer', () => {
  test('adds new word to the state with function addWordToMyVocabulary', () => {
    const state = []
    const word = { id: 1, lemma: 'je', translation: 'minä' }
    deepFreeze(state)
    const newState = myVocabularyReducer(state, addWordToMyVocabulary(word))

    expect(newState).toContainEqual(word)
  })

  test('updates word with function updateMyVocabulary', () => {
    const state = [{ id: 1, lemma: 'je', translation: 'minä' }]
    const word = { id: 1, lemma: 'il', translation: 'hän' }
    deepFreeze(state)
    const newState = myVocabularyReducer(state, updateMyVocabulary(word))

    expect(newState[0].lemma).toBe(word.lemma)
    expect(newState[0].translation).toBe(word.translation)
  })

  test('removes word with function removeWordFromMyVocabulary', () => {
    const state = [{ id: 1, lemma: 'je', translation: 'minä' }]
    const word = { id: 1 }
    deepFreeze(state)
    const newState = myVocabularyReducer(state, removeWordFromMyVocabulary(word))

    expect(newState).toEqual([])
  })

  test('returns empty state with function resetMyVocabulary', () => {
    const state = [{ id: 1, lemma: 'je', translation: 'minä' }]
    deepFreeze(state)
    const newState = myVocabularyReducer(state, resetMyVocabulary())

    expect(newState).toEqual([])
  })
})
