const searchReducer = (state = '', action) => {
  switch (action.type) {
    case 'NEW_SEARCH':
      return action.data
    case 'RESET':
      return ''
    default:
      return state
  }
}

export const newSearch = (content) => {
  return {
    type: 'NEW_SEARCH',
    data: content
  }
}

export const resetSearch = () => {
  return {
    type: 'RESET'
  }
}

export default searchReducer
