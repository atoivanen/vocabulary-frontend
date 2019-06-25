import deepFreeze from 'deep-freeze'

import chapterReducer, {
  setNewChapter,
  resetChapter,
  updateChapterWord,
  removeChapterWord,
  publishChapter,
  setTitle,
  setBody
} from './chapterReducer'

describe('chapterReducer', () => {
  test('returns initial chapter with function setNewChapter', () => {
    const state = {}
    const chapter = { id: 1, title: 'test', words: [{ id: 1, lemma: 'test' }] }
    deepFreeze(state)
    const newState = chapterReducer(state, setNewChapter(chapter))

    expect(newState.title).toBeDefined()
    expect(newState.words[0].learned).toBe(false)
    expect(newState.words[0].selected).toBe(false)
  })

  test('returns empty state with function resetChapter', () => {
    const state = { id: 1, title: 'test', words: [{ id: 1, lemma: 'test' }] }
    deepFreeze(state)
    const newState = chapterReducer(state, resetChapter())

    expect(newState).toEqual({})
  })

  test('updates word with function updateChapterWord', () => {
    const state = { id: 1, title: 'test', words: [{ id: 1, lemma: 'test' }] }
    const word = { id: 1, title: 'test', learned: true, selected: true }
    deepFreeze(state)
    const newState = chapterReducer(state, updateChapterWord(word))

    expect(newState.words[0]).toEqual(word)
  })

  test('removes word with function removeChapterWord', () => {
    const state = { id: 1, title: 'test', words: [{ id: 1, lemma: 'test' }] }
    const word = { id: 1 }
    deepFreeze(state)
    const newState = chapterReducer(state, removeChapterWord(word))

    expect(newState.words).toEqual([])
  })

  test('sets value of public to true with function publishChapter', () => {
    const state = { id: 1, title: 'test', words: [{ id: 1, lemma: 'test' }] }
    deepFreeze(state)
    const newState = chapterReducer(state, publishChapter())

    expect(newState.public).toEqual(true)
  })

  test('sets value of title with function setTitle', () => {
    const state = { id: 1, title: 'test', words: [{ id: 1, lemma: 'test' }] }
    deepFreeze(state)
    const newState = chapterReducer(state, setTitle('new title'))

    expect(newState.title).toEqual('new title')
  })

  test('sets value of body with function setBody', () => {
    const state = { id: 1, title: 'test', words: [{ id: 1, lemma: 'test' }] }
    deepFreeze(state)
    const newState = chapterReducer(state, setBody('new body'))

    expect(newState.body).toEqual('new body')
  })
})
