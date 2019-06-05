import chapterService from '../services/chapters'

const chaptersReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_CHAPTER':
      return [...state, action.data]
    case 'INIT_CHAPTERS':
      return action.data
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

export const initializeChapters = () => {
  return async dispatch => {
    const chapters = await chapterService.getAll()
    dispatch({
      type: 'INIT_CHAPTERS',
      data: chapters
    })
  }
}

export default chaptersReducer
