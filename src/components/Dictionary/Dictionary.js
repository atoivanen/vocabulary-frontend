import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Col, Button } from 'react-bootstrap'

import Words from '../Words/Words'
import Notification from '../UI/Notification/Notification'
import FormModal from '../UI/FormModal/FormModal'
import WordForm from '../Words/WordForm/WordForm'
import Search from '../Search/Search'

import { initializeWords } from '../../reducers/wordsReducer'
import { createWord, setWord, resetWord } from '../../reducers/wordReducer'
import { displayNotification } from '../../reducers/notificationReducer'
import { openModal, closeModal } from '../../reducers/modalReducer'
import { isNew, isNotNew } from '../../reducers/newReducer'

import { wordsToShow } from '../../helpers/helpers'

const Dictionary = (props) => {
  const { t } = useTranslation()
  const pageTitle = t('DictionaryTitle')
  const confirmNotSaving = t('ConfirmNotSavingMessage')
  const newWordButtonText = t('NewWord')
  const modalTitle = t('EditWordModalTitle')

  useEffect(() => {
    props.initializeWords()
  }, [])

  const createWordHandler = () => {
    props.createWord()
    props.isNew()
    props.openModal()
  }

  const showDetailsHandler = word => {
    props.setWord(word)
    props.openModal()
  }

  const closeDetailsHandler = () => {
    if (props.new) {
      const close = window.confirm(confirmNotSaving)
      if (close) {
        props.resetWord()
        props.isNotNew()
        props.closeModal()
      }
    } else {
      props.resetWord()
      props.closeModal()
    }
  }

  const showNextHandler = (event) => {
    const i = props.visibleWords.findIndex(w => w.id === props.word.id)
    const name = event.target.name
    let newIndex

    if (props.new) {
      const close = window.confirm(confirmNotSaving)
      if (close) {
        if (name === 'next') {
          newIndex = 0
         } else if (name === 'previous') {
          newIndex = props.visibleWords.length - 1
         }
        props.resetWord()
        props.isNotNew()
        showDetailsHandler(props.visibleWords[newIndex])
      }
    } else {
      if (name === 'next') {
        newIndex = i === props.visibleWords.length - 1 ? 0 : i + 1
       } else if (name === 'previous') {
        newIndex = i === 0 ? props.visibleWords.length - 1 : i - 1
       }
      props.resetWord()
      showDetailsHandler(props.visibleWords[newIndex])
    }
  }

  const l = 8
  const s = 12

  return (
    <Fragment>
      <Col lg={l} md={l} sm={s} xl={l}  xs={s}>
        <Notification />
        <h1>{pageTitle}</h1>
        <Search />
        <Button
          as="input"
          type="button"
          value={newWordButtonText}
          onClick={createWordHandler} />
        <Words
          words={props.visibleWords}
          showDetails={showDetailsHandler}/>
        <FormModal
          close={closeDetailsHandler}
          showNext={showNextHandler}
          title={modalTitle}>
          <WordForm />
        </FormModal>
      </Col>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    visibleWords: wordsToShow(state.words, state.search),
    search: state.search,
    word: state.word,
    new: state.new
  }
}

const mapDispatchToProps = {
  initializeWords,
  createWord,
  setWord,
  resetWord,
  displayNotification,
  openModal,
  closeModal,
  isNew,
  isNotNew
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dictionary)
