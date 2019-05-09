import React from 'react'
import {useTranslation} from 'react-i18next'
import Navbar from 'react-bootstrap/Navbar'

const Toolbar = (props) => {
  const {t} = useTranslation()

  const appName = t('VocabularyAppName')

  return (
    <header>
      <Navbar bg="dark">
        <Navbar.Brand href="#home">{appName}</Navbar.Brand>
      </Navbar>
    </header>
  )
};

export default Toolbar
