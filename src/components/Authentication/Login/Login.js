import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import Notification from '../../UI/Notification/Notification'

import loginService from '../../../services/login'

import { setUser } from '../../../reducers/userReducer'
import { displayNotification } from '../../../reducers/notificationReducer'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { t } = useTranslation()

  const loginHandler = async (event) => {
    event.preventDefault()
    try {
      const token = await loginService.login({
        username, password
      })
      const user = { username: username, token: token.token, id: token.id}
      window.localStorage.setItem(
        'loggedVocabularyUser', JSON.stringify(user)
      )
      props.setUser(user)
      setUsername('')
      setPassword('')
      props.history.push('/chapters')
    } catch (error) {
      props.displayNotification({
        message: error.response.data.non_field_errors[0],
        messageType: 'danger'
      })
    }
  }

  const l = 4
  const s = 10

  return (
    <Fragment>
      <Col />
      <Col lg={l} md={l} sm={s} xl={l}  xs={s}>
        <h2>{t('LoginTitle')}</h2>
        <Notification />
        <Form onSubmit={loginHandler}>
            <Form.Control
              type="text"
              value={username}
              placeholder={t('Username')}
              name="Username"
              onChange={({ target }) => setUsername(target.value)} />
            <Form.Control
              type="password"
              value={password}
              placeholder={t('Password')}
              name="Password"
              onChange={({ target }) => setPassword(target.value)} />
            <Button type="submit">{t('LoginButton')}</Button>
        </Form>
      </Col>
      <Col />
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setUser,
  displayNotification
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Login))