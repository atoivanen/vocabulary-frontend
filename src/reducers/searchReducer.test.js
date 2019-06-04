import deepFreeze from 'deep-freeze'

import searchReducer from './searchReducer'

describe('searchReducer', () => {
  test('returns new state with action NEW_SEARCH', () => {
    const state = []
    const action = {
      type: 'NEW_SEARCH',
      data: 'test'
    }

    deepFreeze(state)
    const newState = searchReducer(state, action)

    expect(newState.length).toContainEqual(action.data)
  })

  test('returns new state with action RESET', () => {
    const state = 'test'
    const action = {
      type: 'RESET'
    }

    deepFreeze(state)
    const newState = searchReducer(state, action)

    expect(newState).toContainEqual('')
  })
})
