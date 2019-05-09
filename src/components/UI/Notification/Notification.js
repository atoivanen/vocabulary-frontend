import React from 'react'
import Alert from 'react-bootstrap/Alert'

const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  }

  return (
    <Alert variant={messageType}>
      {message}
    </Alert>
  )
}

export default Notification
