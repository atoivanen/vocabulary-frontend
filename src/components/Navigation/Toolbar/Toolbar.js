import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

import { setLanguagePair } from '../../../reducers/languagePairReducer'
import { LANGUAGE_PAIRS } from '../../../helpers/constants'

const Toolbar = (props) => {
  const { t } = useTranslation()

  const languagePairs = LANGUAGE_PAIRS

  const selectableLanguagePairs = languagePairs.filter(pair =>
    pair.id !== props.languagePair.id)

  const selectLanguagePairHandler = (event) => {
    const id = Number(event.target.name)
    const selected = languagePairs.find(pair => pair.id === id)
    props.setLanguagePair(selected)
    window.localStorage.setItem(
      'languagePair', JSON.stringify(selected)
    )
    props.changeLanguage(selected.target)
    window.location.reload()
  }

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
          <NavDropdown title={props.languagePair.name}>
            {selectableLanguagePairs.map((pair) =>
              <NavDropdown.Item
                key={pair.id}
                name={pair.id}
                onClick={selectLanguagePairHandler}>
                {pair.name}
              </NavDropdown.Item>
            )}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    languagePair: state.languagePair
  }
}

const mapDispatchToProps = {
  setLanguagePair
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar)
