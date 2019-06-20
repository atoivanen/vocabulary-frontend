import React from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Nav, Navbar } from 'react-bootstrap'

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
        </Nav>
        { props.user.username
          ? (
            <Nav>
              <Navbar.Text>{props.user.username}</Navbar.Text>
              <Nav.Link href="/logout">{t('LogoutLink')}</Nav.Link>
            </Nav>
          )
          : (
            <Nav>
              <Nav.Link href="register">{t('RegisterLink')}</Nav.Link>
              <Nav.Link href="/login">{t('LoginLink')}</Nav.Link>
            </Nav>
          )
        }
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
