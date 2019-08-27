import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Col, Row, Button, ButtonToolbar, Spinner } from 'react-bootstrap'

import Words from '../Words/Words'
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
  const [loading, setLoading] = useState(false)
  const [practicing, setPracticing] = useState(false)
  const [myTry, setMyTry] = useState('')
  const [solution, setSolution] = useState('')
  const [check, setCheck] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [nothingSelected, setNothingSelected] = useState(true)
  const [wordsToPractice, setWordsToPractice] = useState([])

  const { t } = useTranslation()

  const emptyMyVocabulary = t('NoWordsInVocabulary')
  const l = 8
  const s = 12
  const variantNormal = 'outline-primary'
  const variantDanger = 'outline-danger'
  const marginR = 'mr-1'
  const marginB = 'mb-2'

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        await props.initializeMyVocabulary(props.user.id)
      } catch (error) {
        console.log(error.response)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

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

  const setNewWordToPractice = () => {
    if (wordsToPractice.length === 0) {
      const selectedWords = props.myVocabulary.filter(w => w.selected)
      const randomIndex = Math.floor(Math.random() * selectedWords.length)
      props.setWord(selectedWords[randomIndex])
      selectedWords.splice(randomIndex, 1)
      setWordsToPractice(selectedWords)
    }
    else {
      const randomIndex = Math.floor(Math.random() * wordsToPractice.length)
      props.setWord(wordsToPractice[randomIndex])
      const newWordsToPractice = [...wordsToPractice]
      newWordsToPractice.splice(randomIndex, 1)
      setWordsToPractice(newWordsToPractice)
    }
  }

  const practiceWordsHandler = () => {
    setNewWordToPractice()
    props.newSearch('   ')
    setPracticing(true)
  }

  const stopPracticingHandler = () => {
    props.resetWord()
    setMyTry('')
    setCheck(null)
    setSolution('')
    props.newSearch('')
    selectNothingHandler()
    setWordsToPractice([])
    setPracticing(false)
  }

  const practiceNextHandler = () => {
    setMyTry('')
    setCheck(null)
    setSolution('')
    setNewWordToPractice()
  }

  const updateLearned = async () => {
    if (props.word.word_id) {
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
  }

  const checkWordHandler = (event) => {
    event.preventDefault()
    if (props.word.lemma.toLowerCase() === myTry.toLowerCase()) {
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
        practiceNextHandler()
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

  const toggleCheckedHandler = (event) => {
    const id = Number(event.target.name)
    const updatedWord = props.visibleWords.find(w => w.id === id)
    updatedWord.selected = !updatedWord.selected
    setStateNothingSelected()
    props.updateMyVocabulary(updatedWord)
  }

  const selectAllHandler = () => {
    props.visibleWords.forEach(word => {
      word.selected = true
      props.updateMyVocabulary(word)
    })
    setStateNothingSelected()
  }

  const selectNothingHandler = () => {
    props.visibleWords.forEach(word => {
      word.selected = false
      props.updateMyVocabulary(word)
    })
    setStateNothingSelected()
  }

  const selectLearnedHandler = () => {
    selectNothingHandler()
    const learnedWords = props.visibleWords.filter(word => word.learned)
    learnedWords.forEach(word => {
      word.selected = true
      props.updateMyVocabulary(word)
    })
    setStateNothingSelected()
  }

  const selectNotLearnedHandler = () => {
    selectNothingHandler()
    const notLearnedWords = props.visibleWords.filter(word => !word.learned)
    notLearnedWords.forEach(word => {
      word.selected = true
      props.updateMyVocabulary(word)
    })
    setStateNothingSelected()
  }

  const removeWordsHandler = async () => {
    const wordsToRemove = props.visibleWords.filter(w => w.selected)
    const lemmasToRemove = wordsToRemove.map(w => w.lemma)
    const idsToRemove = wordsToRemove.map(w => w.id)
    let lemmas = lemmasToRemove[0]
    if (lemmasToRemove.length > 1) {
      lemmasToRemove.shift()
      lemmas = lemmasToRemove.reduce((acc, cur) =>
        `${acc}, ${cur}`, lemmas
      )
    }
    const message = t('ConfirmRemove')
    if (window.confirm(`${message} ${lemmas}?`)) {
      try {
        await learningdataService.removeMany(idsToRemove)
        wordsToRemove.forEach(word => {props.removeWordFromMyVocabulary(word)})
        if (wordsToRemove.length > 0) {
          const wordsRemoved = t('WordsRemovedMessage')
          props.displayNotification({
            message: `${wordsRemoved} ${lemmas}`,
            messageType: 'success'
          })
          setNothingSelected(true)
        }
      } catch (error) {
        console.log(error.response)
        if (error.response.request.status === 404) {
          wordsToRemove.forEach(word => {props.removeWordFromMyVocabulary(word)})
          setNothingSelected(true)
        } else {
          props.displayNotification({
            message: t('RemovingFailed'),
            messageType: 'danger'
          })
          setNothingSelected(false)
        }
      }
    }
  }

  if (loading) {
    return (
      <Spinner animation="border">
        <span className="sr-only">{t('Loading')}</span>
      </Spinner>
    )
  }

  if (!props.user.id) {
    return <p>{t('UnauthorizedMyVocabulary')}</p>
  }

  return (
    <Fragment>
      <Row>
        <Col lg={l} md={l} sm={s} xl={l}  xs={s}>
          <h1>{t('MyVocabularyTitle')}</h1>
          <ButtonToolbar className={marginB}>
            <SelectButton
              selectAll={selectAllHandler}
              selectNothing={selectNothingHandler}
              selectLearned={selectLearnedHandler}
              selectNotLearned={selectNotLearnedHandler} />
            <Button
              className={marginR}
              variant={variantNormal}
              disabled={nothingSelected}
              onClick={practiceWordsHandler}>{t('PracticeWordsButton')}</Button>
            <Button
              className={marginR}
              variant={variantDanger}
              disabled={nothingSelected}
              onClick={removeWordsHandler}>{t('RemoveSelectedWordsButton')}
            </Button>
          </ButtonToolbar>
          <Search />
          <div className="scrollableArea">
            {props.myVocabulary.length === 0
              ? <p className="text-muted">{emptyMyVocabulary}</p>
              : <Words
                words={props.visibleWords}
                showDetails={showDetailsHandler}
                selectable="true"
                toggleChecked={toggleCheckedHandler} />
            }
          </div>
          <WordDetails
            close={closeDetailsHandler}
            showNext={showNextHandler} />
          <LearningForm
            word={props.word}
            myTry={myTry}
            check={check}
            solution={solution}
            practicing={practicing}
            disabled={disabled}
            stopPracticing={stopPracticingHandler}
            next={practiceNextHandler}
            checkWord={checkWordHandler}
            change={valueChangedHandler} />
        </Col>
      </Row>
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
