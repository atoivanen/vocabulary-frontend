const notificationReducer = (state = {}, action) => {
  switch (action.type) {
  case 'NEW_NOTIFICATION':
    return { ...action.data }
  case 'RESET_NOTIFICATION':
    return {}
  default:
    return state
  }
}

export const newNotification = (content) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: content
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION'
  }
}

export const displayNotification = (content) => {
  return async dispatch => {
    await dispatch({
      type: 'NEW_NOTIFICATION',
      data: content
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION'
      })
    }, 5000)
  }
}

export default notificationReducer
