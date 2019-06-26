import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Nav, Navbar, ButtonToolbar, Button } from 'react-bootstrap'

const Toolbar = (props) => {
  const { t } = useTranslation()

  return (
    <Navbar collapseOnSelect expand="lg" sticky="top" bg="light">
      <Navbar.Brand href="/">{t('VocabularyAppName')}</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/chapters">{t('ChaptersLink')}</Nav.Link>
          <Nav.Link href="/dictionary">{t('DictionaryLink')}</Nav.Link>
          { props.user.username
            ? (
              <Nav.Link href="/myvocabulary">
                {t('MyVocabularyLink')}
              </Nav.Link>
            )
            : null
          }
          <Nav.Link href="/about">{t('AboutLink')}</Nav.Link>
        </Nav>
        <Nav>
          { props.user.username
            ? (
              <Fragment>
                <Navbar.Text>{props.user.username}</Navbar.Text>
                <Nav.Link href="/logout">{t('LogoutLink')}</Nav.Link>
              </Fragment>
            )
            : (
              <Fragment>
                <Nav.Link href="/register">{t('RegisterLink')}</Nav.Link>
                <Nav.Link href="/login">{t('LoginLink')}</Nav.Link>
              </Fragment>
            )
          }
          <ButtonToolbar>
            <Button
              variant="link"
              onClick={() => props.changeLanguage('fi')}>FI</Button>
            <Button
              variant="link"
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
