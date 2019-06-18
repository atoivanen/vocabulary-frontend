import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Col, Row, Button } from 'react-bootstrap'

import Words from '../Words/Words'
import FormModal from '../UI/FormModal/FormModal'
import WordForm from '../Words/WordForm/WordForm'
import Search from '../Search/Search'

import {
  initializeWords,
  initializeFirstPage
} from '../../reducers/dictionaryReducer'
import { createWord, setWord, resetWord } from '../../reducers/wordReducer'
import { openModal, closeModal } from '../../reducers/modalReducer'
import { isNew, isNotNew } from '../../reducers/newReducer'

import { wordsToShow } from '../../helpers/helpers'

const Dictionary = (props) => {
  const { t } = useTranslation()

  useEffect(() => {
    props.initializeFirstPage()
  }, [])

  // useEffect(() => {
  //   props.initializeWords()
  // }, [])

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
      const close = window.confirm(t('ConfirmNotSavingMessage'))
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
      const close = window.confirm(t('ConfirmNotSavingMessage'))
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
      <Row>
        <Col lg={l} md={l} sm={s} xl={l}  xs={s}>
          <h1>{t('DictionaryTitle')}</h1>
          <Search />
          <Button
            as="input"
            type="button"
            value={t('NewWord')}
            onClick={createWordHandler} />
          <Words
            words={props.visibleWords}
            showDetails={showDetailsHandler}/>
          <FormModal
            close={closeDetailsHandler}
            showNext={showNextHandler}
            title={t('EditWordModalTitle')}>
            <WordForm />
          </FormModal>
        </Col>
      </Row>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    visibleWords: wordsToShow(state.dictionary, state.search),
    search: state.search,
    word: state.word,
    new: state.new
  }
}

const mapDispatchToProps = {
  initializeWords,
  initializeFirstPage,
  createWord,
  setWord,
  resetWord,
  openModal,
  closeModal,
  isNew,
  isNotNew
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dictionary)
