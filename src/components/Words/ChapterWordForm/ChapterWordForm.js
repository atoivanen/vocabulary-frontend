import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Form, Button, Modal } from 'react-bootstrap'
import Autosuggest from 'react-autosuggest'

import Notification from '../../UI/Notification/Notification'
import { displayNotification } from '../../../reducers/notificationReducer'
import { setDictionary } from '../../../reducers/dictionaryReducer'
import { addChapterWord } from '../../../reducers/chapterReducer'
import chapterWordService from '../../../services/chapterWords'
import wordService from '../../../services/words'
import { dictionaryWordsToShow as wordsToShow } from '../../../helpers/helpers'
import './chapterWordForm.css'

const WordForm = (props) => {
  const [value, setValue] = useState('')
  const [token, setToken] = useState('')
  const [wordId, setWordId] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [filter, setFilter] = useState('')

  const { t } = useTranslation()

  const getSuggestionValue = suggestion => {
    setWordId(suggestion.id)
    return suggestion.lemma
  }

  const renderSuggestion = suggestion => (
    <div>
      <b>{suggestion.lemma}</b> {suggestion.translation}
    </div>
  )

  const onSuggestionsFetchRequested = async ({ value }) => {
    const newFilter = value.slice(0, 2)
    const inputLength = value.length
    if (inputLength <= 1) {
      setSuggestions([])
    } else if (inputLength === 2) {
      if (filter !== newFilter) {
        setFilter(newFilter)
        try {
          const words = await wordService.getFiltered(newFilter)
          props.setDictionary(words)
          setSuggestions(words)
        } catch (error) {
          console.log(error.response)
          props.displayNotification({
            message: t('ErrorWhenFetchingWords'),
            messageType: 'danger'
          })
        }
      } else {
        setSuggestions(wordsToShow(props.dictionary, value))
      }
    } else {
      setSuggestions(wordsToShow(props.dictionary, value))
    }
  }

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  const valueChangedHandler = (event, { newValue }) => {
    setValue(newValue)
  }

  const inputProps = {
    placeholder: t('SearchPlaceholder'),
    value,
    onChange: valueChangedHandler
  }

  const theme = {
    container: 'autosuggest',
    input: 'form-control',
    suggestionsContainer: 'dropdown',
    suggestionsList: `dropdown-menu ${suggestions.length ? 'show' : ''}`,
    suggestion: 'dropdown-item',
    suggestionFocused: 'active'
  }

  const validateWord = () => {
    if (!wordId || !value) {
      props.displayNotification({
        message: t('ChooseWordFromDictionary'),
        messageType: 'danger'
      })
      return false
    }
    return true
  }

  const saveWordHandler = async (event) => {
    event.preventDefault()
    if (validateWord()) {
      const wordproperties = {
        word: wordId,
        chapter: props.chapter.id,
        token,
        frequency: 1
      }
      try {
        const word = await chapterWordService.create(wordproperties)
        props.addChapterWord(word)
        setValue('')
        setToken('')
        setFilter('')
        setWordId('')
        props.close()
        const msg = t('AddedWord')
        props.displayNotification({
          message: `${msg} ${word.lemma}`,
          messageType: 'success'
        })
      } catch (error) {
        console.log(error.response)
        props.displayNotification({
          message: t('ErrorWhenSaving'),
          messageType: 'danger'
        })
      }
    }
  }

  return (
    <Modal show={props.modal} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>{t('AddWordToVocabulary')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={saveWordHandler}>
          <Notification />
          <Form.Group controlId="formGroupWord">
            <Form.Label>{t('WordLabel')}:</Form.Label>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
              theme={theme}
            />
          </Form.Group>
          <Form.Group controlId="formGroupTokens"> 
            <Form.Label>{t('WordForms')}:</Form.Label>
            <Form.Control
              type="text"
              onChange={({ target }) => setToken(target.value)} />
          </Form.Group>
          <Button type="submit">{t('SubmitWordButton')}</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    dictionary: state.dictionary,
    chapter: state.chapter
  }
}

const mapDispatchToProps = {
  displayNotification,
  setDictionary,
  addChapterWord
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordForm)
