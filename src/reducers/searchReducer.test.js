import deepFreeze from 'deep-freeze'

import searchReducer, { newSearch, resetSearch } from './searchReducer'

describe('searchReducer', () => {
  test('returns new state with function newSearch', () => {
    const state = []
    deepFreeze(state)
    const newState = searchReducer(state, newSearch('test'))

    expect(newState).toBe('test')
  })

  test('returns empty state with function resetSearch', () => {
    const state = 'test'
    deepFreeze(state)
    const newState = searchReducer(state, resetSearch())

    expect(newState).toBe('')
  })
})
