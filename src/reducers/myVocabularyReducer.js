import userService from '../services/users'

const myVocabularyReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_WORD':
      return [...state, action.data]
    case 'UPDATE_WORD':
      const id = action.data.id
      const updatedWord = { ...action.data }
      return state.map(word => word.id !== id ? word : updatedWord)
    case 'INIT_VOCABULARY':
      return action.data
    case 'RESET':
      return []
    default:
      return state
  }
}

export const addWordToMyVocabulary = (content) => {
  return {
    type: 'NEW_WORD',
    data: content
  }
}

export const updateMyVocabulary = (content) => {
  return {
    type: 'UPDATE_WORD',
    data: content
  }
}

export const resetMyVocabulary = () => {
  return {
    type: 'RESET'
  }
}

export const initializeMyVocabulary = (userId) => {
  return async dispatch => {
    const userDetails = await userService.getOne(userId)
    dispatch({
      type: 'INIT_VOCABULARY',
      data: userDetails.learningdata
    })
  }
}

export default myVocabularyReducer
