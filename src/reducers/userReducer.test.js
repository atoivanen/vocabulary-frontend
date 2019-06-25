import deepFreeze from 'deep-freeze'

import userReducer, { setUser, resetUser } from './userReducer'

describe('userReducer', () => {
  test('returns user with function setUser', () => {
    const state = {}
    const user = { username: 'test' }
    deepFreeze(state)
    const newState = userReducer(state, setUser(user))

    expect(newState.username).toBeDefined()
  })

  test('returns empty object with function resetUser', () => {
    const state = { username: 'test' }
    deepFreeze(state)
    const newState = userReducer(state, resetUser())

    expect(newState).toEqual({})
  })
})
