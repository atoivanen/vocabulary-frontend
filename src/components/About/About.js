import React from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Row } from 'react-bootstrap'

import './about.css'

const About = () => {
  const { t } = useTranslation()

  return (
    <Row>
      <div id="aboutPage">
        <h1>{t('AboutTitle')}</h1>
        <p>
          <Trans i18nKey="AboutUsage">
            What it is used for. Link to <Link to="/chapters">chapters</Link>.
          </Trans>
        </p>
        <p>
          <Trans i18nKey="AboutRegistering">
            <Link to="/register">Register</Link> link and why to register.
            <Link to="myvocabulary">My Vocabulary</Link>.
          </Trans>
        </p>
        <p>
          {t('AboutGeneral')}
        </p>
        <p>
          {t('AboutTechnical')}
        </p>
        <ul>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/atoivanen/vocabulary-frontend">
            vocabulary-frontend
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/atoivanen/vocabulary_backend">
            vocabulary_backend
            </a>
          </li>
        </ul>
      </div>
    </Row>
  )
}

export default About