import chapterService from '../services/chapters'

const chapterReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_CHAPTER':
      return action.data
    case 'RESET_CHAPTER':
      return null
    default:
      return state
  }
}

export const setChapter = (content) => {
  return {
    type: 'SET_CHAPTER',
    data: content
  }
}

export const resetChapter = () => {
  return {
    type: 'RESET_CHAPTER'
  }
}

export const initializeChapter = (id) => {
  return async dispatch => {
    const chapter = await chapterService.getOne(id)
    const initialChapter = {
      words: chapter.words.forEach(w => w.learned = false),
      ...chapter
    }
    dispatch({
      type: 'SET_CHAPTER',
      data: initialChapter
    })
  }
}

export default chapterReducer