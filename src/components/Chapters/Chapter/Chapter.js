import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Col } from 'react-bootstrap'

import Words from '../../Words/Words'
import FormModal from '../../UI/FormModal/FormModal'
import WordDetails from '../../Words/WordDetails/WordDetails'
import Notification from '../../UI/Notification/Notification'
import Search from '../../Search/Search'

import { setWord, resetWord } from '../../../reducers/wordReducer'
import { displayNotification } from '../../../reducers/notificationReducer'
import { openModal, closeModal } from '../../../reducers/modalReducer'

import { vocabularyWordsToShow } from '../../../helpers/helpers'

const Chapter = (props) => {
  const { t } = useTranslation()
  const vocabularyTitle = t('VocabularyTitle')

  const chapter = props.chapter

  if (!chapter) {
    return null
  }

  const showDetailsHandler = word => {
    props.setWord(word)
    props.openModal()
  }

  const closeDetailsHandler = () => {
      props.resetWord()
      props.closeModal()
  }

  const showNextHandler = (event) => {
    const i = chapter.words.findIndex(w => w.id === props.word.id)
    const name = event.target.name
    let newIndex

    if (name === 'next') {
      newIndex = i === chapter.words.length - 1 ? 0 : i + 1
     } else if (name === 'previous') {
      newIndex = i === 0 ? chapter.words.length - 1 : i - 1
     }
    props.resetWord()
    showDetailsHandler(chapter.words[newIndex])
  }

  const l = 8
  const r = 4
  const margin = { marginTop: 50 }

  return (
    <Fragment>
      <Col lg={l} md={l} sm={l} xl={l} xs={l}>
        <Notification />
        <h1>{chapter.title}</h1>
        <p>{chapter.body}</p>
      </Col>
      <Col lg={r} md={r} sm={r} xl={r} xs={r}>
        <h2 style={margin}>{vocabularyTitle}</h2>
        <Search />
        <Words
          words={vocabularyWordsToShow(chapter.words, props.search)}
          showDetails={showDetailsHandler}/>
        <FormModal
          close={closeDetailsHandler}
          showNext={showNextHandler}>
          <WordDetails />
        </FormModal>
      </Col>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    search: state.search,
    word: state.word
  }
}

const mapDispatchToProps = {
  setWord,
  resetWord,
  displayNotification,
  openModal,
  closeModal
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chapter)
