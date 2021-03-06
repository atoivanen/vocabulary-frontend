import wordService from '../services/words'

const dictionaryReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_WORD':
    return [...state, action.data]
  case 'UPDATE_WORDS': {
    const id = action.data.id
    const updatedWord = { ...action.data }
    return state.map(word => word.id !== id ? word : updatedWord)
  }
  case 'DELETE_WORD': {
    const i = state.findIndex(word => word.id === action.data.id)
    const updatedDictionary = [...state]
    updatedDictionary.splice(i, 1)
    return updatedDictionary
  }
  case 'INIT_WORDS':
    return action.data
  default:
    return state
  }
}

export const addWordToDictionary = (word) => {
  return {
    type: 'NEW_WORD',
    data: word
  }
}

export const removeWordFromDictionary = (word) => {
  return {
    type: 'DELETE_WORD',
    data: word
  }
}

export const updateDictionary = (word) => {
  return {
    type: 'UPDATE_WORDS',
    data: word
  }
}

export const setDictionary = (words) => {
  return {
    type: 'INIT_WORDS',
    data: words
  }
}

export const initializeFilteredWords = (startswith, source, target) => {
  return async dispatch => {
    const words = await wordService.getFiltered(startswith, source, target)
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
