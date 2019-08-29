import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Nav, Navbar, ButtonToolbar, Button } from 'react-bootstrap'

const Toolbar = (props) => {
  const { t } = useTranslation()

  const variantNormal = 'outline-primary'
  const marginR = 'mr-1'

  return (
    <Navbar collapseOnSelect expand="lg" sticky="top" bg="light">
      <Navbar.Brand href="/">{t('VocabularyAppName')}</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/chapters" data-cy="chapters-link">
            {t('ChaptersLink')}
          </Nav.Link>
          <Nav.Link href="/dictionary" data-cy="dictionary-link">
            {t('DictionaryLink')}
          </Nav.Link>
          { props.user.username
            ? (
              <Nav.Link href="/myvocabulary" data-cy="my-vocabulary-link">
                {t('MyVocabularyLink')}
              </Nav.Link>
            )
            : null
          }
          <Nav.Link href="/about" data-cy="about-link">{t('AboutLink')}</Nav.Link>
        </Nav>
        <Nav>
          { props.user.username
            ? (
              <Fragment>
                <Navbar.Text data-cy="username">{props.user.username}</Navbar.Text>
                <Nav.Link href="/logout" data-cy="logout-link">
                  {t('LogoutLink')}
                </Nav.Link>
              </Fragment>
            )
            : (
              <Fragment>
                <Nav.Link href="/register" data-cy="register-link">
                  {t('RegisterLink')}
                </Nav.Link>
                <Nav.Link href="/login" data-cy="login-link">
                  {t('LoginLink')}
                </Nav.Link>
              </Fragment>
            )
          }
          <ButtonToolbar>
            <Button
              className={marginR}
              variant={variantNormal}
              size="sm"
              data-cy="finnish-button"
              onClick={() => props.changeLanguage('fi')}>FI</Button>
            <Button
              className={marginR}
              variant={variantNormal}
              size="sm"
              data-cy="english-button"
              onClick={() => props.changeLanguage('en')}>EN</Button>
          </ButtonToolbar>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(
  mapStateToProps
)(Toolbar)
