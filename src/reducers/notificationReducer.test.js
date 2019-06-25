import deepFreeze from 'deep-freeze'

import notificationReducer, {
  newNotification,
  resetNotification
} from './notificationReducer'

describe('notificationReducer', () => {
  test('returns new state with function newNotification', () => {
    const state = []
    const notification = { message: 'test', type: 'success' }
    deepFreeze(state)
    const newState = notificationReducer(state, newNotification(notification))

    expect(newState.message).toBeDefined()
  })

  test('returns empty state with function resetNotification', () => {
    const state = { message: 'test', type: 'success' }
    deepFreeze(state)
    const newState = notificationReducer(state, resetNotification())

    expect(newState).toEqual({})
  })
})
