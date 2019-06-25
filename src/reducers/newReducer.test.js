import deepFreeze from 'deep-freeze'

import newReducer, { isNew, isNotNew } from './newReducer'

describe('newReducer', () => {
  test('returns true with function isNew', () => {
    const state = false
    deepFreeze(state)
    const newState = newReducer(state, isNew())

    expect(newState).toBe(true)
  })

  test('returns false with function isNotNew', () => {
    const state = true
    deepFreeze(state)
    const newState = newReducer(state, isNotNew())

    expect(newState).toBe(false)
  })
})
