import React from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Toolbar = (props) => {
  const { t } = useTranslation()

  return (
      <Navbar sticky="top" bg="light">
        <LinkContainer to="/">
          <Navbar.Brand>{t('VocabularyAppName')}</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/chapters">
              <Nav.Link>{t('ChaptersLink')}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/dictionary">
              <Nav.Link>{t('DictionaryLink')}</Nav.Link>
            </LinkContainer>
          </Nav>
          { props.user.username
            ? (
              <Nav>
                <Navbar.Text>{props.user.username}</Navbar.Text>
                <LinkContainer to="/logout">
                  <Nav.Link>{t('LogoutLink')}</Nav.Link>
                </LinkContainer>
              </Nav>
            )
            : (
              <Nav>
                <LinkContainer to="/register">
                  <Nav.Link>{t('RegisterLink')}</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>{t('LoginLink')}</Nav.Link>
                </LinkContainer>
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
