import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Row, ListGroup } from 'react-bootstrap'

import { LANGUAGE_PAIRS } from '../../helpers/constants'
import { setLanguagePair } from '../../reducers/languagePairReducer'
import './frontPage.css'
import bookPicture from '../../images/blur-data-definition-261779.gif'

const FrontPage = (props) => {
  const { t } = useTranslation()

  const languagePairs = LANGUAGE_PAIRS

  const selectLanguagePairHandler = (event) => {
    const id = Number(event.target.name)
    const selected = languagePairs.find(pair => pair.id === id)
    props.setLanguagePair(selected)
    window.localStorage.setItem(
      'languagePair', JSON.stringify(selected)
    )
    props.changeLanguage(selected.target)
    props.history.push('/chapters')
  }

  return (
    <Row>
      <img id="background" src={bookPicture} alt="French Book" />
      <div className="text">
        <h1>{t('SelectLanguageMessage')}</h1>
        <div id="languageSelection">
          <ListGroup>
            {languagePairs.map((pair) =>
              <ListGroup.Item
                action
                key={pair.id}
                name={pair.id}
                onClick={selectLanguagePairHandler}>
                {pair.longName}
              </ListGroup.Item>
            )}
          </ListGroup>
        </div>
      </div>
    </Row>
  )
}

const mapStateToProps = (state) => {
  return {
    languagePair: state.languagePair
  }
}

const mapDispatchToProps = {
  setLanguagePair
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontPage))