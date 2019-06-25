import deepFreeze from 'deep-freeze'

import modalReducer, { openModal, closeModal } from './modalReducer'

describe('modalReducer', () => {
  test('returns true with function openModal', () => {
    const state = false
    deepFreeze(state)
    const newState = modalReducer(state, openModal())

    expect(newState).toBe(true)
  })

  test('returns false with function closeModal', () => {
    const state = true
    deepFreeze(state)
    const newState = modalReducer(state, closeModal())

    expect(newState).toBe(false)
  })
})
