import wordService from '../services/words'

const dictionaryReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_WORD':
      return [...state, action.data]
    case 'UPDATE_WORDS':
      const id = action.data.id
      const updatedWord = { ...action.data }
      return state.map(word => word.id !== id ? word : updatedWord)
    case 'INIT_WORDS':
      return action.data
    default:
      return state
  }
}

export const addWord = (content) => {
  return {
    type: 'NEW_WORD',
    data: content
  }
}

export const updateWords = (content) => {
  return {
    type: 'UPDATE_WORDS',
    data: content
  }
}

export const initializeFirstPage = () => {
  return async dispatch => {
    const words = await wordService.getFirstPage()
    dispatch({
      type: 'INIT_WORDS',
      data: words
    })
  }
}

export const initializeWords = () => {
  return async dispatch => {
    const words = await wordService.getAll()
    dispatch({
      type: 'INIT_WORDS',
      data: words
    })
  }
}


export default dictionaryReducer
