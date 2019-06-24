import React from 'react'
import { useTranslation } from 'react-i18next'
import { Row } from 'react-bootstrap'

import './frontPage.css'
import bookPicture from '../../images/blur-data-definition-261779.jpg'
import documents from '../../images/documents-128.gif'
import literature from '../../images/literature-128.gif'

const FrontPage = () => {
  const { t } = useTranslation()

  return (
    <Row>
      <img id="background" src={bookPicture} alt="French Book" />
      <div className="text">
        <h1>{t('WelcomeTitle')}</h1>
        <p>{t('WelcomeMessage')}</p>
        <div className="iconsBox">
          <a href="/chapters">
            <img className="icon" src={documents} alt="Chapters" />
            <p className="linkText">{t('ChaptersLink')}</p>
          </a>
          <a href="/dictionary">
            <img className="icon" src={literature} alt="Dictionary" />
            <p className="linkText">{t('DictionaryLink')}</p>
          </a>
        </div>
      </div>
    </Row>
  )
}

export default FrontPage