import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { useTranslation, Trans } from 'react-i18next'
import { Col, Button, ButtonToolbar } from 'react-bootstrap'

import Words from '../Words/Words'
import Notification from '../UI/Notification/Notification'
import FormModal from '../UI/FormModal/FormModal'
import Search from '../Search/Search'
import WordDetails from '../Words/WordDetails/WordDetails'
import LearningForm from '../Words/LearningForm/LearningForm'
import SelectButton from '../UI/SelectButton/SelectButton'

import {
  initializeMyVocabulary,
  updateMyVocabulary,
  removeWordFromMyVocabulary
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
  const [nothingSelected, setNothingSelected] = useState(true)

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
    const wordsToPractice = props.myVocabulary.filter(w => w.selected)
    const randomIndex = Math.floor(Math.random() * wordsToPractice.length)
    props.setWord(wordsToPractice[randomIndex])
  }

  const practiceWords = () => {
    setRandomWordToPractice()
    props.newSearch('   ')
    setPracticing(true)
  }

  const stopPracticing = () => {
    props.resetWord()
    setMyTry('')
    setCheck(null)
    setSolution('')
    props.newSearch('')
    selectNothing()
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
      }, 1000)
    }
  }

  const valueChangedHandler = (event) => {
    setMyTry(event.target.value)
  }

  const setStateNothingSelected = () => {
    props.myVocabulary.find(w => w.selected)
      ? setNothingSelected(false)
      : setNothingSelected(true)
  }

  const toggleChecked = (event) => {
    const id = Number(event.target.name)
    const updatedWord = props.visibleWords.find(w => w.id === id)
    updatedWord.selected = !updatedWord.selected
    setStateNothingSelected()
    props.updateMyVocabulary(updatedWord)
  }

  const selectAll = () => {
    props.visibleWords.forEach(word => {
      word.selected = true
      props.updateMyVocabulary(word)
    })
    setStateNothingSelected()
  }

  const selectNothing = () => {
    props.visibleWords.forEach(word => {
      word.selected = false
      props.updateMyVocabulary(word)
    })
    setStateNothingSelected()
  }

  const selectLearned = () => {
    selectNothing()
    const learnedWords = props.visibleWords.filter(word => word.learned)
    learnedWords.forEach(word => {
      word.selected = true
      props.updateMyVocabulary(word)
    })
    setStateNothingSelected()
  }

  const selectNotLearned = () => {
    selectNothing()
    const notLearnedWords = props.visibleWords.filter(word => !word.learned)
    notLearnedWords.forEach(word => {
      word.selected = true
      props.updateMyVocabulary(word)
    })
    setStateNothingSelected()
  }

  const removeWords = () => {
    const wordsToRemove = props.visibleWords.filter(w => w.selected)
    wordsToRemove.forEach(async (word) => {
      props.removeWordFromMyVocabulary(word)
      try {
        await learningdataService.remove(word.id)
      } catch (error) {
        console.log(error.response.data)
        props.displayNotification({
          message: error.response.data.detail,
          messageType: 'danger'
        })
      }
    })
    setStateNothingSelected()
  }

  const l = 8
  const s = 12

  if (props.myVocabulary.length === 0) {
    return (
      <Fragment>
        <Col lg={l} md={l} sm={s} xl={l}  xs={s}>
          <h1>{t('MyVocabularyTitle')}</h1>
          <p>{t('NoWordsInVocabulary')}</p>
        </Col>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Col lg={l} md={l} sm={s} xl={l}  xs={s}>
        <Notification />
        <h1>{t('MyVocabularyTitle')}</h1>
        {count > 0
          ? (
            <Trans i18nKey="NumberOfWordsLearned">
              You know {{count}} word!
            </Trans>
          )
          : null
        }
        <Search />
        <ButtonToolbar className="mp-2">
          <SelectButton
            selectAll={selectAll}
            selectNothing={selectNothing}
            selectLearned={selectLearned}
            selectNotLearned={selectNotLearned} />
          <Button
            disabled={nothingSelected}
            onClick={practiceWords}>{t('PracticeWordsButton')}</Button>
          <Button variant="danger"
            disabled={nothingSelected}
            onClick={removeWords}>{t('RemoveSelectedWordsButton')}</Button>
        </ButtonToolbar>
        <Words
          words={props.visibleWords}
          showDetails={showDetailsHandler}
          selectable="true"
          toggleChecked={toggleChecked} />
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
  removeWordFromMyVocabulary,
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