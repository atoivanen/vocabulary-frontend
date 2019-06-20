import chapterService from '../services/chapters'

const chaptersReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_CHAPTER':
    return [...state, action.data]
  case 'INIT_CHAPTERS':
    return action.data
  case 'REMOVE_CHAPTER': {
    const i = state.findIndex(chapter => chapter.id === action.data.id)
    const updatedChapters = [...state]
    updatedChapters.splice(i, 1)
    return updatedChapters
  }
  case 'UPDATE_CHAPTER': {
    const id = action.data.id
    return state.map(chapter =>
      chapter.id !== id ? chapter : action.data
    )
  }
  case 'RESET_CHAPTERS':
    return []
  default:
    return state
  }
}

export const addChapter = (content) => {
  return {
    type: 'NEW_CHAPTER',
    data: content
  }
}

export const updateChapter = (content) => {
  return {
    type: 'UPDATE_CHAPTER',
    data: content
  }
}

export const removeChapter = (content) => {
  return {
    type: 'REMOVE_CHAPTER',
    data: content
  }
}

export const resetChapters = () => {
  return {
    type: 'RESET_CHAPTERS'
  }
}

export const initializeChapters = () => {
  return async dispatch => {
    const chapters = await chapterService.getAll()
    const initialChapters = chapters.map(chapter => ({
      ...chapter,
      selected: false
    }))
    dispatch({
      type: 'INIT_CHAPTERS',
      data: initialChapters
    })
  }
}

export default chaptersReducer
