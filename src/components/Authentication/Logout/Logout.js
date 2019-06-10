import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { resetUser } from '../../../reducers/userReducer'

import chapterService from '../../../services/chapters'

const Logout = (props) => {
  useEffect (() => {
    window.localStorage.removeItem('loggedVocabularyUser')
    props.resetUser()
    chapterService.resetToken()
    props.history.push('/chapters')
  }, [])

  return <div>Logging out</div>
}

const mapDispatchToProps = {
  resetUser
}

export default withRouter(connect(
  null,
  mapDispatchToProps
)(Logout))
