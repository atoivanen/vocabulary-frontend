import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import loginService from '../../../services/login'

import { setUser } from '../../../reducers/userReducer'
import { displayNotification } from '../../../reducers/notificationReducer'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { t } = useTranslation()

  const l = 4
  const s = 10
  const variantNormal = 'outline-primary'
  const marginB = 'mb-2'

  const loginHandler = async (event) => {
    event.preventDefault()
    if (username.length < 1 || password.length < 1) {
      props.displayNotification({
        message: t('WrongCredentials'),
        messageType: 'danger'
      })
    } else {
      try {
        const token = await loginService.login({
          username, password
        })
        const user = { username: username, token: token.token, id: token.id }
        window.localStorage.setItem(
          'loggedVocabularyUser', JSON.stringify(user)
        )
        props.setUser(user)
        setUsername('')
        setPassword('')
        props.history.push('/chapters')
      } catch (error) {
        props.displayNotification({
          message: t('WrongCredentials'),
          messageType: 'danger'
        })
      }
    }
  }

  return (
    <Fragment>
      <Row>
        <Col />
        <Col lg={l} md={l} sm={s} xl={l}  xs={s}>
          <h2>{t('LoginTitle')}</h2>
          <Form onSubmit={loginHandler}>
            <Form.Control
              className={marginB}
              type="text"
              value={username}
              placeholder={t('Username')}
              name="Username"
              id="usernameField"
              onChange={({ target }) => setUsername(target.value)} />
            <Form.Control
              className={marginB}
              type="password"
              value={password}
              placeholder={t('Password')}
              name="Password"
              id="passwordField"
              onChange={({ target }) => setPassword(target.value)} />
            <Button
              className={marginB}
              variant={variantNormal}
              id="loginButton"
              type="submit">{t('LoginButton')}
            </Button>
          </Form>
        </Col>
        <Col />
      </Row>
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
