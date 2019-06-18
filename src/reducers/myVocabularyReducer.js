import userService from '../services/users'

const myVocabularyReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_MY_WORD':
      return [...state, action.data]
    case 'REMOVE_MY_WORD':
      const i = state.findIndex(word => word.id === action.data.id)
      const updatedVocabulary = [...state]
      updatedVocabulary.splice(i, 1)
      return updatedVocabulary
    case 'UPDATE_MY_WORD':
      const id = action.data.id
      const updatedWord = { ...action.data }
      return state.map(word => word.id !== id ? word : updatedWord)
    case 'INIT_MY_VOCABULARY':
      return action.data
    case 'RESET_MY_VOCABULARY':
      return []
    default:
      return state
  }
}

export const addWordToMyVocabulary = (content) => {
  return {
    type: 'NEW_MY_WORD',
    data: content
  }
}

export const updateMyVocabulary = (content) => {
  return {
    type: 'UPDATE_MY_WORD',
    data: content
  }
}

export const removeWordFromMyVocabulary = (content) => {
  return {
    type: 'REMOVE_MY_WORD',
    data: content
  }
}

export const resetMyVocabulary = () => {
  return {
    type: 'RESET_MY_VOCABULARY'
  }
}

export const initializeMyVocabulary = (userId) => {
  return async dispatch => {
    const userDetails = await userService.getOne(userId)
    const initialWords = userDetails.learningdata.map(word =>
      ({ ...word, selected: false })
    )
    dispatch({
      type: 'INIT_MY_VOCABULARY',
      data: initialWords
    })
  }
}

export default myVocabularyReducer
