import chapterService from '../services/chapters'

const chapterReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CHAPTER':
      return action.data
    case 'RESET_CHAPTER':
      return {}
    case 'PUBLISH_CHAPTER':
      return { ...state, public: true }
    case 'SET_TITLE':
      return { ...state, title: action.data }
    case 'SET_BODY':
      return { ...state, body: action.data }
    case 'REMOVE_WORD':
      const i = state.words.findIndex(word => word.id === action.data.id)
      const updatedWords = [...state.words]
      updatedWords.splice(i, 1)
      return { ...state, words: updatedWords }
    case 'UPDATE_WORD':
      const id = action.data.id
      const updatedWordList = state.words.map(word =>
        word.id !== id ? word : action.data
      )
      return { ...state, words: updatedWordList}
    default:
      return state
  }
}

export const setNewChapter = (content) => {
  const initialWords = content.words.map(w => ({
    ...w,
    learned: false,
    selected: false
  }))
  const initialChapter = {
    ...content,
    words: initialWords
  }
  return {
    type: 'SET_CHAPTER',
    data: initialChapter
  }
}

export const resetChapter = () => {
  return {
    type: 'RESET_CHAPTER'
  }
}

export const updateChapterWord = (word) => {
  return {
    type: 'UPDATE_WORD',
    data: word
  }
}

export const removeChapterWord = (word) => {
  return {
    type: 'REMOVE_WORD',
    data: word
  }
}

export const setChapter = (content) => {
  return {
    type: 'SET_CHAPTER',
    data: content
  }
}

export const publishChapter = () => {
  return {
    type: 'PUBLISH_CHAPTER'
  }
}

export const setTitle = (title) => {
  return {
    type: 'SET_TITLE',
    data: title
  }
}

export const setBody = (body) => {
  return {
    type: 'SET_BODY',
    data: body
  }
}

export const initializeChapter = (id) => {
  return async dispatch => {
    const chapter = await chapterService.getOne(id)
    const initialWords = chapter.words.map(w => ({
      ...w,
      learned: false,
      selected: false
    }))
    const initialChapter = {
      ...chapter,
      words: initialWords
    }
    dispatch({
      type: 'SET_CHAPTER',
      data: initialChapter
    })
  }
}

export default chapterReducer
