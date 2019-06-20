const modalReducer = (state = false, action) => {
  switch (action.type) {
  case 'OPEN_MODAL':
    return true
  case 'CLOSE_MODAL':
    return false
  default:
    return state
  }
}

export const openModal = () => {
  return {
    type: 'OPEN_MODAL'
  }
}

export const closeModal = () => {
  return {
    type: 'CLOSE_MODAL'
  }
}

export default modalReducer
