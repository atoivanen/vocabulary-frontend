import React from 'react'
import { useTranslation } from 'react-i18next'
import { Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Toolbar = (props) => {
  const { t } = useTranslation()

  const appName = t('VocabularyAppName')
  const chaptersLink = t('ChaptersLink')
  const dictionaryLink = t('DictionaryLink')
  const login = t('LoginLink')

  return (
      <Navbar sticky="top" bg="light">
        <LinkContainer to="/">
          <Navbar.Brand>{appName}</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link>{chaptersLink}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/dictionary">
              <Nav.Link>{dictionaryLink}</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <LinkContainer to="/">
              <Nav.Link>{login}</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  )
};

export default Toolbar
