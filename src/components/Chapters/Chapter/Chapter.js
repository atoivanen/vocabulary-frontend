import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Col, Row, Button, ButtonToolbar, Spinner } from 'react-bootstrap'

import './chapter.css'
import Words from '../../Words/Words'
import WordDetails from '../../Words/WordDetails/WordDetails'
import Search from '../../Search/Search'
import LearningForm from '../../Words/LearningForm/LearningForm'
import SelectButton from '../../UI/SelectButton/SelectButton'
import {
  initializeChapter,
  publishChapter,
  updateChapterWord,
  removeChapterWord
} from '../../../reducers/chapterReducer'
import { setWord, resetWord } from '../../../reducers/wordReducer'
import { displayNotification } from '../../../reducers/notificationReducer'
import { openModal, closeModal } from '../../../reducers/modalReducer'
import { newSearch } from '../../../reducers/searchReducer'
import {
  initializeMyVocabulary,
  addWordToMyVocabulary,
  updateMyVocabulary
} from '../../../reducers/myVocabularyReducer'
import { vocabularyWordsToShow } from '../../../helpers/helpers'
import learningdataService from '../../../services/learningdata'
import chapterWordService from '../../../services/chapterWords'
import chapterService from '../../../services/chapters'
import checkmark from '../../../images/checkmark-32.gif'
import xMark from '../../../images/x-mark-32.gif'

const Chapter = (props) => {
  const [loading, setLoading] = useState(false)
  const [practicing, setPracticing] = useState(false)
  const [myTry, setMyTry] = useState('')
  const [solution, setSolution] = useState('')
  const [check, setCheck] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [nothingSelected, setNothingSelected] = useState(true)

  const { t } = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        await props.initializeChapter(props.id)
      } catch (error) {
        console.log(error.response)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (props.user.id) {
      props.initializeMyVocabulary(props.user.id)
    }
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
    const wordsToPractice = props.chapter.words.filter(w => w.selected)
    const randomIndex = Math.floor(Math.random() * wordsToPractice.length)
    props.setWord(wordsToPractice[randomIndex])
  }

  const saveWordToMyVocabulary = async () => {
    if (props.user.id && props.word.word_id) {
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
          console.log(error.response)
        }
      } else {
        // create new
        try {
          const newLearningdata = await learningdataService.create(learningdata)
          props.addWordToMyVocabulary({
            ...props.word,
            id: newLearningdata.id
          })
        } catch (error) {
          console.log(error.response)
        }
      }
    }
  }

  const practiceWordsHandler = () => {
    setRandomWordToPractice()
    props.newSearch('   ')
    setPracticing(true)
  }

  const stopPracticingHandler = () => {
    saveWordToMyVocabulary()
    props.resetWord()
    setMyTry('')
    setCheck(null)
    setSolution('')
    props.newSearch('')
    setPracticing(false)
  }

  const practiceNextHandler = () => {
    saveWordToMyVocabulary()
    setMyTry('')
    setCheck(null)
    setSolution('')
    setRandomWordToPractice()
  }

  const checkWordHandler = (event) => {
    event.preventDefault()
    if (props.word.lemma === myTry) {
      setCheck(checkmark)
      const updatedWord = { ...props.word }
      updatedWord.learned = true
      props.setWord(updatedWord)
      props.updateChapterWord(updatedWord)
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
    props.chapter.words.find(w => w.selected)
      ? setNothingSelected(false)
      : setNothingSelected(true)
  }

  const toggleCheckedHandler = (event) => {
    const id = Number(event.target.name)
    const updatedWord = props.chapter.words.find(w => w.id === id)
    updatedWord.selected = !updatedWord.selected
    setStateNothingSelected()
    props.updateChapterWord(updatedWord)
  }

  const selectAllHandler = () => {
    const visibleWords = vocabularyWordsToShow(
      props.chapter.words,
      props.search
    )
    visibleWords.forEach(word => {
      word.selected = true
      props.updateChapterWord(word)
    })
    setStateNothingSelected()
  }

  const selectNothingHandler = () => {
    const visibleWords = vocabularyWordsToShow(
      props.chapter.words,
      props.search
    )
    visibleWords.forEach(word => {
      word.selected = false
      props.updateChapterWord(word)
    })
    setStateNothingSelected()
  }

  const selectLearnedHandler = () => {
    selectNothingHandler()
    const visibleWords = vocabularyWordsToShow(
      props.chapter.words,
      props.search
    )
    const learnedWords = visibleWords.filter(word => word.learned)
    learnedWords.forEach(word => {
      word.selected = true
      props.updateChapterWord(word)
    })
    setStateNothingSelected()
  }

  const selectNotLearnedHandler = () => {
    selectNothingHandler()
    const visibleWords = vocabularyWordsToShow(
      props.chapter.words,
      props.search
    )
    const notLearnedWords = visibleWords.filter(word => !word.learned)
    notLearnedWords.forEach(word => {
      word.selected = true
      props.updateChapterWord(word)
    })
    setStateNothingSelected()
  }

  const removeWordsHandler = async () => {
    const visibleWords = vocabularyWordsToShow(
      props.chapter.words,
      props.search
    )
    const wordsToRemove = visibleWords.filter(w => w.selected)
    const idsToRemove = wordsToRemove.map(w => w.id)
    try {
      await chapterWordService.removeMany(idsToRemove)
      wordsToRemove.forEach(word => {props.removeChapterWord(word)})
      if (wordsToRemove.length > 0) {
        let lemmas = wordsToRemove[0].lemma
        if (wordsToRemove.length > 1) {
          wordsToRemove.shift()
          lemmas = wordsToRemove.reduce((acc, cur) =>
            `${acc}, ${cur.lemma}`, lemmas
          )
        }
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
        wordsToRemove.forEach(word => {props.removeChapterWord(word)})
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

  const publishChapterHandler = async () => {
    const content = { public: true }
    try {
      await chapterService.update(props.chapter.id, content)
      props.publishChapter()
      props.displayNotification({
        message: t('PublishSucceeded'),
        messageType: 'success'
      })
    } catch (error) {
      console.log(error.response)
      props.displayNotification({
        message: t('PublishFailed'),
        messageType: 'danger'
      })
    }
  }

  const l = 8
  const r = 4

  if (loading) {
    return (
      <Spinner animation="border">
        <span className="sr-only">{t('Loading')}</span>
      </Spinner>
    )
  } else if (!props.chapter.id) {
    return null
  } else if ((props.user.id !== props.chapter.created_by)
              && !props.chapter.public) {
    return <h2>{t('Unauthorized')}</h2>
  }

  return (
    <Fragment>
      <Row>
        <Col lg={l} md={l} sm={l} xl={l} xs={l}>
          <div id="chapter">
            <h1>{props.chapter.title}</h1>
            <p>{props.chapter.body}</p>
          </div>
        </Col>
        <Col lg={r} md={r} sm={r} xl={r} xs={r}>
          <h2>{t('VocabularyTitle')}</h2>
          <Search />
          <ButtonToolbar className="mp-2">
            <SelectButton
              selectAll={selectAllHandler}
              selectNothing={selectNothingHandler}
              selectLearned={selectLearnedHandler}
              selectNotLearned={selectNotLearnedHandler}
              size="sm" />
            <Button
              disabled={nothingSelected}
              onClick={practiceWordsHandler}
              size="sm">{t('PracticeWordsButton')}</Button>
          </ButtonToolbar>
          <div id="vocabulary">
            <Words
              words={vocabularyWordsToShow(props.chapter.words, props.search)}
              showDetails={showDetailsHandler}
              selectable="true"
              toggleChecked={toggleCheckedHandler} />
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
      <Row>
        <Col lg={l} md={l} sm={l} xl={l} xs={l}>
          <ButtonToolbar>
            {props.chapter.created_by === props.user.id && !props.chapter.public
              ? (<Button
                onClick={publishChapterHandler}>{t('PublishChapterButton')}
              </Button>
              )
              : null
            }
            {props.chapter.created_by === props.user.id
              ? (<Button
                href={`/edit/${props.chapter.id}`}>{t('EditChapterButton')}
              </Button>
              )
              : null
            }
          </ButtonToolbar>
        </Col>
        <Col lg={r} md={r} sm={r} xl={r} xs={r}>
          {props.chapter.created_by === props.user.id
            ? (<Button variant="danger"
              disabled={nothingSelected}
              onClick={removeWordsHandler}>
              {t('RemoveSelectedWordsButton')}
            </Button>
            )
            : null
          }
        </Col>
      </Row>
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
  publishChapter,
  updateChapterWord,
  removeChapterWord,
  initializeMyVocabulary,
  addWordToMyVocabulary,
  updateMyVocabulary,
  setWord,
  resetWord,
  displayNotification,
  openModal,
  closeModal,
  newSearch
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chapter)
