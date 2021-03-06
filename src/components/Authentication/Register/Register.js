import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { displayNotification } from '../../../reducers/notificationReducer'

import registerService from '../../../services/register'

const Register = (props) => {
  const [username, setUsername] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')

  const { t } = useTranslation()

  const l = 4
  const s = 10
  const variantNormal = 'outline-primary'
  const marginB = 'mb-2'

  const validate = () => {
    if (username.length > 150) {
      props.displayNotification({
        message: t('UsernameCharacterLimitMessage'),
        messageType: 'danger'
      })
      return false
    }
    if (!username) {
      props.displayNotification({
        message: t('UsernameMissingMessage'),
        messageType: 'danger'
      })
      return false
    }
    if (!password1) {
      props.displayNotification({
        message: t('PasswordMissingMessage'),
        messageType: 'danger'
      })
      return false
    }
    if (password1 !== password2) {
      props.displayNotification({
        message: t('PasswordsAreDifferentMessage'),
        messageType: 'danger'
      })
      return false
    }
    return true
  }

  const registerHandler = async (event) => {
    event.preventDefault()
    if (validate()) {
      try {
        await registerService.register({ username, password: password1 })
        setUsername('')
        setPassword1('')
        setPassword2('')
        props.displayNotification({
          message: t('UserRegisteredSuccessfully'),
          messageType: 'success'
        })
        props.history.push('/login')
      } catch (error) {
        props.displayNotification({
          message: error.response.data.username[0],
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
          <h2>{t('RegisterTitle')}</h2>
          <Form onSubmit={registerHandler}>
            <Form.Control
              className={marginB}
              type="text"
              value={username}
              placeholder={t('Username')}
              name="Username"
              onChange={({ target }) => setUsername(target.value)} />
            <Form.Control
              className={marginB}
              type="password"
              value={password1}
              placeholder={t('Password')}
              name="Password1"
              onChange={({ target }) => setPassword1(target.value)} />
            <Form.Control
              className={marginB}
              type="password"
              value={password2}
              placeholder={t('PasswordAgain')}
              name="Password2"
              onChange={({ target }) => setPassword2(target.value)} />
            <Button
              className={marginB}
              variant={variantNormal}
              type="submit">{t('RegisterButton')}</Button>
          </Form>
        </Col>
        <Col />
      </Row>
    </Fragment>
  )
}

const mapDispatchToProps = {
  displayNotification
}

export default withRouter(connect(
  null,
  mapDispatchToProps
)(Register))
