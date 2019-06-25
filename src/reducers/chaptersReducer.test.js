import deepFreeze from 'deep-freeze'

import chaptersReducer, {
  addChapter,
  updateChapter,
  removeChapter,
  resetChapters
} from './chaptersReducer'

describe('chaptersReducer', () => {
  test('adds new chapter with function addChapter', () => {
    const state = []
    const chapter = { id: 1, title: 'test' }
    deepFreeze(state)
    const newState = chaptersReducer(state, addChapter(chapter))

    expect(newState).toContainEqual(chapter)
  })

  test('updates chapter with function updateChapter', () => {
    const state = [{ id: 1, title: 'test' }]
    const chapter = { id: 1, title: 'new title' }
    deepFreeze(state)
    const newState = chaptersReducer(state, updateChapter(chapter))

    expect(newState[0].title).toBe(chapter.title)
  })

  test('removes chapter with function removeChapter', () => {
    const state = [{ id: 1, title: 'test' }]
    const chapter = { id: 1 }
    deepFreeze(state)
    const newState = chaptersReducer(state, removeChapter(chapter))

    expect(newState).toEqual([])
  })

  test('returns empty list with function resetChapters', () => {
    const state = [{ id: 1, title: 'test' }]
    deepFreeze(state)
    const newState = chaptersReducer(state, resetChapters())

    expect(newState).toEqual([])
  })
})
