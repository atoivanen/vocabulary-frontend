import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Col, Row, Button, Form, Spinner } from 'react-bootstrap'

import Words from '../Words/Words'
import WordForm from '../Words/WordForm/WordForm'
import {
  initializeWords,
  initializeFilteredWords
} from '../../reducers/dictionaryReducer'
import { createWord, setWord, resetWord } from '../../reducers/wordReducer'
import { openModal, closeModal } from '../../reducers/modalReducer'
import { isNew, isNotNew } from '../../reducers/newReducer'
import { newSearch } from '../../reducers/searchReducer'
import { dictionaryWordsToShow as wordsToShow } from '../../helpers/helpers'

const Dictionary = (props) => {
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('')

  const { t } = useTranslation()

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
      props.resetWord()
      props.isNotNew()
      props.closeModal()
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
      if (name === 'next') {
        newIndex = 0
      } else if (name === 'previous') {
        newIndex = props.visibleWords.length - 1
      }
      props.resetWord()
      props.isNotNew()
      showDetailsHandler(props.visibleWords[newIndex])
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

  const searchWordHandler = async ({ target }) => {
    props.newSearch(target.value)
    if (target.value && filter !== target.value[0]) {
      setLoading(true)
      setFilter(target.value[0])
      await props.initializeFilteredWords(target.value[0])
      setLoading(false)
    }
  }

  const l = 8
  const s = 12

  return (
    <Fragment>
      <Row>
        <Col lg={l} md={l} sm={s} xl={l}  xs={s}>
          <h1>{t('DictionaryTitle')}</h1>
          <Form.Control
            type="text"
            placeholder={t('SearchPlaceholder')}
            value={props.search}
            onChange={searchWordHandler} />
          {props.user.id
            ? (
              <Button
                as="input"
                type="button"
                value={t('NewWord')}
                onClick={createWordHandler} />
            )
            : null
          }
          {loading ? (
            <div>
              <Spinner animation="border">
                <span className="sr-only">{t('Loading')}</span>
              </Spinner>
            </div>
          ) : null
          }
          <Words
            words={props.visibleWords}
            showDetails={showDetailsHandler}/>
          <WordForm
            close={closeDetailsHandler}
            showNext={showNextHandler}
            showNextAllowed={props.visibleWords.length > 1} />
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
    new: state.new,
    user: state.user
  }
}

const mapDispatchToProps = {
  initializeWords,
  initializeFilteredWords,
  createWord,
  setWord,
  resetWord,
  newSearch,
  openModal,
  closeModal,
  isNew,
  isNotNew
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dictionary)
