import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { useTranslation, Trans } from 'react-i18next'
import { Col, Button } from 'react-bootstrap'

import Words from '../Words/Words'
import Notification from '../UI/Notification/Notification'
import FormModal from '../UI/FormModal/FormModal'
import Search from '../Search/Search'
import WordDetails from '../Words/WordDetails/WordDetails'
import LearningForm from '../Words/LearningForm/LearningForm'

import {
  initializeMyVocabulary,
  updateMyVocabulary
} from '../../reducers/myVocabularyReducer'
import { displayNotification } from '../../reducers/notificationReducer'
import { setWord, resetWord } from '../../reducers/wordReducer'
import { openModal, closeModal } from '../../reducers/modalReducer'
import { newSearch } from '../../reducers/searchReducer'

import learningdataService from '../../services/learningdata'

import { wordsToShow } from '../../helpers/helpers'

import checkmark from '../../images/checkmark-32.gif'
import xMark from '../../images/x-mark-32.gif'

const MyVocabulary = (props) => {
  const [practicing, setPracticing] = useState(false)
  const [myTry, setMyTry] = useState('')
  const [solution, setSolution] = useState('')
  const [check, setCheck] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const { t } = useTranslation()

  useEffect(() => {
    props.initializeMyVocabulary(props.user.id)
  }, [])

  const count = props.myVocabulary.filter(w => w.learned).length

  const showDetailsHandler = word => {
    props.setWord(word)
    props.openModal()
  }

  const closeDetailsHandler = () => {
    props.resetWord()
    props.closeModal()
  }

  const showNextHandler = (event) => {
    const i = props.visibleWords.findIndex(w => w.id === props.word.id)
    const name = event.target.name
    let newIndex

    if (name === 'next') {
      newIndex = i === props.visibleWords.length - 1 ? 0 : i + 1
     } else if (name === 'previous') {
      newIndex = i === 0 ? props.visibleWords.length - 1 : i - 1
     }
    props.resetWord()
    showDetailsHandler(props.visibleWords[newIndex])
  }

  const setRandomWordToPractice = () => {
    const wordsToPractice = props.myVocabulary.filter(w => !w.learned)
    const randomIndex = Math.floor(Math.random() * wordsToPractice.length)
    props.setWord(wordsToPractice[randomIndex])
  }

  const practiceWords = () => {
    setRandomWordToPractice()
    props.newSearch('?')
    setPracticing(true)
  }

  const stopPracticing = () => {
    props.resetWord()
    setMyTry('')
    setCheck(null)
    setSolution('')
    props.newSearch('')
    setPracticing(false)
  }

  const practiceNext = () => {
    setMyTry('')
    setCheck(null)
    setSolution('')
    setRandomWordToPractice()
  }

  const updateLearned = async () => {
    try {
      const learningdata = {
        user: props.user.id,
        word: props.word.word_id,
        learned: true
      }
      await learningdataService.update(props.word.id, learningdata)
    } catch (error) {
      console.log(error.response.data)
      props.displayNotification({
        message: error.response.data.detail,
        messageType: 'danger'
      })
    }
  }

  const checkWord = (event) => {
    event.preventDefault()
    if (props.word.lemma === myTry) {
      setCheck(checkmark)
      const updatedWord = { ...props.word }
      updatedWord.learned = true
      props.updateMyVocabulary(updatedWord)
      updateLearned()
    } else {
      setCheck(xMark)
      setDisabled(true)
      setSolution(props.word.lemma)
      setTimeout(() => {
        setSolution('')
        setDisabled(false)
        practiceNext()
      }, 3000)
    }
  }

  const valueChangedHandler = (event) => {
    setMyTry(event.target.value)
  }

  const l = 8
  const s = 12

  return (
    <Fragment>
      <Col lg={l} md={l} sm={s} xl={l}  xs={s}>
        <Notification />
        <h1>{t('MyVocabularyTitle')}</h1>
        <Trans i18nKey="NumberOfWordsLearned">
          You know {{count}} word!
        </Trans>
        <Search />
        <Button onClick={practiceWords}>{t('PracticeAllWordsButton')}</Button>
        <Words
          words={props.visibleWords}
          showDetails={showDetailsHandler}
          selectable="true" />
        <FormModal
          close={closeDetailsHandler}
          showNext={showNextHandler}>
          <WordDetails />
        </FormModal>
        <LearningForm
          word={props.word}
          myTry={myTry}
          check={check}
          solution={solution}
          practicing={practicing}
          disabled={disabled}
          stopPracticing={stopPracticing}
          next={practiceNext}
          checkWord={checkWord}
          change={valueChangedHandler} />
      </Col>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    visibleWords: wordsToShow(state.myVocabulary, state.search),
    myVocabulary: state.myVocabulary,
    search: state.search,
    word: state.word,
    user: state.user
  }
}

const mapDispatchToProps = {
  initializeMyVocabulary,
  updateMyVocabulary,
  setWord,
  resetWord,
  openModal,
  closeModal,
  displayNotification,
  newSearch
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyVocabulary)
