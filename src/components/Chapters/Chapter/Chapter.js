import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Col, Button } from 'react-bootstrap'

import Words from '../../Words/Words'
import FormModal from '../../UI/FormModal/FormModal'
import WordDetails from '../../Words/WordDetails/WordDetails'
import Notification from '../../UI/Notification/Notification'
import Search from '../../Search/Search'
import LearningForm from '../../Words/LearningForm/LearningForm'

import { initializeChapter, setChapter } from '../../../reducers/chapterReducer'
import { setWord, resetWord } from '../../../reducers/wordReducer'
import { displayNotification } from '../../../reducers/notificationReducer'
import { openModal, closeModal } from '../../../reducers/modalReducer'
import {
  initializeMyVocabulary,
  addWordToMyVocabulary,
  updateMyVocabulary
} from '../../../reducers/myVocabularyReducer'

import { vocabularyWordsToShow } from '../../../helpers/helpers'

import learningdataService from '../../../services/learningdata'

import checkmark from '../../../images/checkmark-32.gif'
import xMark from '../../../images/x-mark-32.gif'

const Chapter = (props) => {
  const [practicing, setPracticing] = useState(false)
  const [myTry, setMyTry] = useState('')
  const [solution, setSolution] = useState('')
  const [check, setCheck] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const { t } = useTranslation()

  useEffect(() => {
    props.initializeChapter(props.id)
  }, [])

  if (props.user.id) {
    useEffect(() => {
      props.initializeMyVocabulary(props.user.id)
    }, [])
  }

  if (!props.chapter) {
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
    const visibleWords = vocabularyWordsToShow(
      props.chapter.words,
      props.search
    )
    const i = visibleWords.findIndex(w => w.id === props.word.id)
    const name = event.target.name
    let newIndex

    if (name === 'next') {
      newIndex = i === visibleWords.length - 1 ? 0 : i + 1
     } else if (name === 'previous') {
      newIndex = i === 0 ? visibleWords.length - 1 : i - 1
     }
    props.resetWord()
    showDetailsHandler(visibleWords[newIndex])
  }

  const setRandomWordToPractice = () => {
    const wordsToPractice = props.chapter.words.filter(w => !w.learned)
    const randomIndex = Math.floor(Math.random() * wordsToPractice.length)
    props.setWord(wordsToPractice[randomIndex])
  }

  const saveWordToMyVocabulary = async () => {
    if (props.user.id) {
      const learningdata = {
        user: props.user.id,
        word: props.word.word_id,
        learned: props.word.learned
      }
      const oldWord = props.myVocabulary.find(w =>
        w.word_id === props.word.word_id
      )
      if (oldWord) {
        // update
        try {
          await learningdataService.update(oldWord.id, learningdata)
          props.updateMyVocabulary(props.word)
        } catch (error) {
          console.log(error.response.data)
          props.displayNotification({
            message: error.response.data.detail,
            messageType: 'danger'
          })
        }
      } else {
        // create new
        try {
          await learningdataService.create(learningdata)
          props.addWordToMyVocabulary(props.word)
        } catch (error) {
          console.log(error.response.data)
          props.displayNotification({
            message: error.response.data.detail,
            messageType: 'danger'
          })
        }
      }
    }
  }

  const practiceWords = () => {
    setRandomWordToPractice()
    setPracticing(true)
  }

  const stopPracticing = () => {
    saveWordToMyVocabulary()
    props.resetWord()
    setMyTry('')
    setCheck(null)
    setSolution('')
    setPracticing(false)
  }

  const practiceNext = () => {
    saveWordToMyVocabulary()
    setMyTry('')
    setCheck(null)
    setSolution('')
    setRandomWordToPractice()
  }

  const checkWord = (event) => {
    event.preventDefault()
    if (props.word.lemma === myTry) {
      setCheck(checkmark)
      const updatedWord = { ...props.word }
      updatedWord.learned = true
      const updatedChapter = { ...props.chapter }
      updatedChapter.words = props.chapter.words.map(
        w => w.id !== props.word.id ? w : updatedWord
      )
      props.setWord(updatedWord)
      props.setChapter(updatedChapter)
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
  const r = 4
  const margin = { marginTop: 50 }

  return (
    <Fragment>
      <Col lg={l} md={l} sm={l} xl={l} xs={l}>
        <Notification />
        <h1>{props.chapter.title}</h1>
        <p>{props.chapter.body}</p>
      </Col>
      <Col lg={r} md={r} sm={r} xl={r} xs={r}>
        <h2 style={margin}>{t('VocabularyTitle')}</h2>
        <Search />
        <Button onClick={practiceWords}>{t('PracticeAllWordsButton')}</Button>
        <Words
          words={vocabularyWordsToShow(props.chapter.words, props.search)}
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
    chapter: state.chapter,
    search: state.search,
    word: state.word,
    user: state.user,
    myVocabulary: state.myVocabulary
  }
}

const mapDispatchToProps = {
  initializeChapter,
  setChapter,
  initializeMyVocabulary,
  addWordToMyVocabulary,
  updateMyVocabulary,
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
