import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'react-bootstrap'

import Words from '../../components/Words/Words'
import Notification from '../../components/UI/Notification/Notification'
import FormModal from '../../components/UI/FormModal/FormModal'
import WordForm from '../../components/Words/WordForm/WordForm'
import Search from '../../components/Search/Search'

import wordService from '../../services/words'

const Dictionary = () => {
  const [ words, setWords ] = useState([])
  const [ notification, setNotification ] = useState({})
  const [ formNotification, setFormNotification ] = useState({})
  const [ word, setWord ] = useState(null)
  const [ modal, setModal ] = useState(false)
  const [ isNew, setIsNew ] = useState(false)
  const [ newFilter, setNewFilter ] = useState('')
  const { t } = useTranslation()

  const modalTitle = t('EditWordModalTitle')
  const pageTitle = t('DictionaryTitle')
  const errorMessage = t('ErrorWhenSaving')
  const successMessage = t('WordSavedSuccessfully')
  const missingWord = t('WordIsMissingMessage')
  const missingTranslation = t('TranslationIsMissingMessage')
  const missingPOS = t('POSIsMissingMessage')
  const missingGender = t('GenderIsMissingMessage')
  const confirmNotSaving = t('ConfirmNotSavingMessage')

  const source_lang = 'fr'
  const target_lang = 'fi'

  useEffect(() => {
    wordService
      .getAll()
      .then(initialWords => {
        setWords(initialWords)
      })
  }, [])

  const displayMessage = (message, messageType, place) => {
    if (!place) {
      setNotification({ message, messageType })
      setTimeout(() => {
        setNotification({})
      }, 3000)
    } else if (place === 'form') {
      setFormNotification({ message, messageType })
      setTimeout(() => {
        setFormNotification({})
      }, 3000)
    }
  }

  const validate = (word) => {
    if (!word.lemma) {
      displayMessage(missingWord, 'danger', 'form')
      return false
    } else if (!word.translation) {
      displayMessage(missingTranslation, 'danger', 'form')
      return false
    } else if (!word.pos) {
      displayMessage(missingPOS, 'danger', 'form')
      return false
    } else if (word.pos === 'NOUN' && !word.gender) {
      displayMessage(missingGender, 'danger', 'form')
      return false
    }
    return true
  }

  const openModalHandler = word => {
    setWord(word)
    setModal(true)
  }

  const closeModalHandler = () => {
    if (isNew) {
      const close = window.confirm(confirmNotSaving)
      if (close) {
        setWord(null)
        setIsNew(false)
        setModal(false)
      }
    } else {
      setWord(null)
      setModal(false)
    }
  }

  const showNextHandler = (event) => {
    const i = words.findIndex(w => w.id === word.id)
    const name = event.target.name
    let newIndex

    if (isNew) {
      const close = window.confirm(confirmNotSaving)
      if (close) {
        if (name === 'next') {
          newIndex = 0   
         } else if (name === 'previous') {
          newIndex = words.length - 1
         }
        setWord(null)
        setIsNew(false)
        openModalHandler(words[newIndex])
      }
    } else {
      if (name === 'next') {
        newIndex = i === words.length - 1 ? 0 : i + 1   
       } else if (name === 'previous') {
        newIndex = i === 0 ? words.length - 1 : i - 1
       }
      setWord(null)
      openModalHandler(words[newIndex])
    }
  }

  const valueChangedHandler = (event) => {
    const updatedWord = { ...word }
    const property = event.target.name
    updatedWord[property] = event.target.value
    setWord(updatedWord)
  }

  const createWordHandler = () => {
    const id = Math.max.apply(Math, words.map(word => word.id)) + 1
    const initialWord = {
      id: id,
      lemma: '',
      translation: '',
      pos: 'ADJ',
      gender: null,
      source_lang,
      target_lang
    }
    setWord(initialWord)
    setIsNew(true)
    setModal(true)
  }

  const saveWordHandler = async (event) => {
    event.preventDefault()
    if (validate(word)) {
      if (!isNew) {
        try {
          const returnedWord = await wordService.update(word.id, word)
          setWord(null)
          setModal(false)
          setWords(words.map(w => w.id !== returnedWord.id ? w : returnedWord ))
          displayMessage(successMessage, 'success')
        } catch(error) {
          console.log(error)
          displayMessage(errorMessage, 'danger')
        }
      } else {
        try {
          const returnedWord = await wordService.create(word)
          setIsNew(false)
          setWord(null)
          setModal(false)
          setWords(words.concat(returnedWord))
          displayMessage(successMessage, 'success')
        } catch(error) {
          console.log(error)
          displayMessage(errorMessage, 'danger')
        }
      }
    }
  }

  const filterHandler = (event) => {
    setNewFilter(event.target.value)
  }

  const filteredWords = words.filter(word =>
    word.lemma.toUpperCase().includes(newFilter.toUpperCase())
    || word.translation.toUpperCase().includes(newFilter.toUpperCase())
  )

  return (
    <div>
      <Notification
        message={notification.message}
        messageType={notification.messageType} />
      <h1>{pageTitle}</h1>
      <Search
        value={newFilter}
        changed={filterHandler}
      />
      <Words
        words={filteredWords}
        show={openModalHandler} />
      <FormModal
        showModal={modal}
        title={modalTitle}
        close={closeModalHandler}
        next={(event) => showNextHandler(event)} >
        <WordForm
          word={word}
          changed={(event) => valueChangedHandler(event)}
          saveWord={(event) => saveWordHandler(event)}
          notification={formNotification} />
      </FormModal>
      <Button
        as="input"
        type="button"
        value={t('NewWord')}
        onClick={createWordHandler} />
    </div>
  )

}

export default Dictionary
