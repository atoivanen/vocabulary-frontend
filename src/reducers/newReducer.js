const newReducer = (state = false, action) => {
  switch (action.type) {
  case 'IS_NEW':
    return true
  case 'IS_NOT_NEW':
    return false
  default:
    return state
  }
}

export const isNew = () => {
  return {
    type: 'IS_NEW'
  }
}

export const isNotNew = () => {
  return {
    type: 'IS_NOT_NEW'
  }
}

export default newReducer
