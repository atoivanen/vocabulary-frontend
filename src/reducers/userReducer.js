const userReducer = (state = {}, action) => {
  switch (action.type) {
  case 'SET_USER':
    return { ...action.data }
  case 'RESET':
    return {}
  default:
    return state
  }
}

export const setUser = (content) => {
  return {
    type: 'SET_USER',
    data: content
  }
}

export const resetUser = () => {
  return {
    type: 'RESET'
  }
}

export default userReducer
