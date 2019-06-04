import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button } from 'react-bootstrap'

import Words from '../../components/Words/Words'
import Notification from '../../components/UI/Notification/Notification'
import FormModal from '../../components/UI/FormModal/FormModal'
import WordForm from '../../components/Words/WordForm/WordForm'
import Search from '../../components/Search/Search'

import { initializeWords } from '../../reducers/wordsReducer'
import { createWord, setWord, resetWord } from '../../reducers/wordReducer'
import { displayNotification } from '../../reducers/notificationReducer'
import { openModal, closeModal } from '../../reducers/modalReducer'
import { isNew, isNotNew } from '../../reducers/newReducer'

const Dictionary = (props) => {
  const { t } = useTranslation()
  const pageTitle = t('DictionaryTitle')
  const confirmNotSaving = t('ConfirmNotSavingMessage')
  const newWordButtonText = t('NewWord')

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

  return (
    <div>
      <Notification />
      <h1>{pageTitle}</h1>
      <Search />
      <Words
        words={props.visibleWords}
        showDetails={showDetailsHandler}/>
      <FormModal
        close={closeDetailsHandler}
        showNext={showNextHandler}>
        <WordForm />
      </FormModal>
      <Button
        as="input"
        type="button"
        value={newWordButtonText}
        onClick={createWordHandler} />
    </div>
  )
}

const makeComparable = (word) => {
  const regexA = /[âàá]/g
  const regexE = /[êèéë]/g
  const regexI = /[îï]/g
  const regexO = /ô/g
  const regexU = /[ûùü]/g
  const regexC = /ç/g
  return word
    .toLowerCase()
    .replace(regexA, 'a')
    .replace(regexE, 'e')
    .replace(regexI, 'i')
    .replace(regexO, 'o')
    .replace(regexU, 'u')
    .replace(regexC, 'c')
}

const alphabeticalSort = (a, b) => {
  const wordA = makeComparable(a.lemma)
  const wordB = makeComparable(b.lemma)
  if (wordA < wordB) {
    return -1
  }
  if (wordA > wordB) {
    return 1
  }
  return 0
}

const wordsToShow = ({ words, search }) => {
  const filteredWords = words.filter(word => {
    const comparableLemma = makeComparable(word.lemma)
    const comparableTranslation = makeComparable(word.translation)
    const comparableSearch = makeComparable(search)
    return (comparableLemma.startsWith(comparableSearch)
      || comparableTranslation.startsWith(comparableSearch))
  })

  const sortedWords = filteredWords.sort((a, b) => alphabeticalSort(a, b))

  return sortedWords
}

const mapStateToProps = (state) => {
  return {
    visibleWords: wordsToShow(state),
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
