import React, { useState, useEffect, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import Button from 'react-bootstrap/Button'

import Words from '../../components/Words/Words'
import Notification from '../../components/UI/Notification/Notification'
import wordService from '../../services/words'

const Dictionary = () => {
  const [ words, setWords ] = useState([])
  const [ showDetails, setShowDetails ] = useState([])
  const [ notification, setNotification ] = useState({})
  const [ formNotification, setFormNotification ] = useState({})
  const [ isNew, setIsNew ] = useState(false)
  const { t } = useTranslation()
  
  const modalTitle = t('EditWordModalTitle')
  const pageTitle = t('DictionaryTitle')
  const errorMessage = t('ErrorWhenSaving')
  const successMessage = t('WordSavedSuccessfully')
  const missingWord = t('WordIsMissingMessage')
  const missingTranslation = t('TranslationIsMissingMessage')
  const missingPOS = t('POSIsMissingMessage')
  const missingGender = t('GenderIsMissingMessage')

  useEffect(() => {
    wordService
      .getAll()
      .then(initialWords => {
        const initialShowDetails = initialWords.map(
          word => ({ id:word.id, show:false })
        )
        setShowDetails(initialShowDetails)
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

  const showModalHandler = id => {
     const showEl = showDetails.find(n => n.id === id)
     const changedShowEl = { ...showEl, show: true }
     setShowDetails(showDetails.map(
       show => show.id !== id ? show : changedShowEl)
     )
  }

  const closeModalHandler = id => {
    const showEl = showDetails.find(n => n.id === id)
    const changedShowEl = { ...showEl, show: false }
    setShowDetails(showDetails.map(show =>
      show.id !== id ? show : changedShowEl))
    if (isNew) {
      const updatedWords = [...words]
      updatedWords.pop()
      const updatedShowDetails = [...showDetails]
      updatedShowDetails.pop()
      setWords(updatedWords)
      setShowDetails(updatedShowDetails)
      setIsNew(false)
    }
  }

  const valueChangedHandler = (event, id) => {
    const changedWord = {...words.find(word => word.id === id)}
    const property = event.target.name
    changedWord[property] = event.target.value
    setWords(words.map(word => word.id !== id ? word : changedWord))
  }

  const showNextHandler = (event, id) => {
    const updatedShowDetails = [...showDetails]
    const i = updatedShowDetails.findIndex((el) => el.id === id)
    const name = event.target.name

    if (name === 'next') {
     const nextIndex = i === updatedShowDetails.length - 1 ? 0 : i + 1
     updatedShowDetails[nextIndex].show = true
    } else if (name === 'previous') {
     const previousIndex = i === 0 ? updatedShowDetails.length - 1 : i - 1
     updatedShowDetails[previousIndex].show = true
    }

    updatedShowDetails[i].show = false
    setShowDetails(updatedShowDetails)
  }

  const createWordHandler = () => {
    const id = Math.max.apply(Math, words.map(word => word.id)) + 1
    const initialWord = {
      id: id,
      lemma: '',
      translation: '',
      pos: 'ADJ',
      gender: null,
      source_lang: 'fr',
      target_lang: 'fi'
    }
    setWords(words.concat(initialWord))
    setIsNew(true)
    setShowDetails(showDetails.concat({ id: id, show: true }))
  }

  const saveWordHandler = (event, id) => {
    event.preventDefault()
    const savedWord = {...words.find(word => word.id === id)}
    if (validate(savedWord)) {
      if (!isNew) {
        wordService
          .update(id, savedWord)
          .then(returnedWord => {
            displayMessage(successMessage, 'success')
            closeModalHandler(savedWord.id)
          })
          .catch(error => {
            displayMessage(errorMessage, 'danger')
          })
      } else {
        wordService
          .create(savedWord)
          .then(returnedWord => {
            displayMessage(successMessage, 'success')
            closeModalHandler(savedWord.id)
            setIsNew(false)
          })
          .catch(error => {
            displayMessage(errorMessage, 'danger')
          })
      }
    }
  }

  return (
    <Fragment>
      <Notification
        message={notification.message}
        messageType={notification.messageType} />
      <h1>{pageTitle}</h1>
      <Words
        words={words}
        showDetails={showDetails}
        changed={valueChangedHandler}
        close={closeModalHandler}
        show={showModalHandler}
        next={showNextHandler}
        saveWord={saveWordHandler}
        title={modalTitle}
        notification={formNotification} />
      <Button
        variant="dark"
        as="input"
        type="button"
        value={t('NewWord')}
        onClick={createWordHandler} />
    </Fragment>
  )

}

export default Dictionary
