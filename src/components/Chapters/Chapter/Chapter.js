import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Col, Row, Button, ButtonToolbar, Spinner } from 'react-bootstrap'

import './chapter.css'
import Words from '../../Words/Words'
import WordDetails from '../../Words/WordDetails/WordDetails'
import Search from '../../Search/Search'
import LearningForm from '../../Words/LearningForm/LearningForm'
import SelectButton from '../../UI/SelectButton/SelectButton'
import ChapterWordForm from '../../Words/ChapterWordForm/ChapterWordForm'
import {
  initializeChapter,
  publishChapter,
  resetChapter,
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
  const [modal, setModal] = useState(false)
  const [wordsToPractice, setWordsToPractice] = useState([])

  const { t } = useTranslation()

  const l = 7
  const r = 5
  const s = 6
  const variantNormal = 'outline-primary'
  const variantDanger = 'outline-danger'
  const marginR = 'mr-1'
  const marginB = 'mb-2'

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

  const setNewWordToPractice = () => {
    if (wordsToPractice.length === 0) {
      const selectedWords = props.chapter.words.filter(w => w.selected)
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
    saveWordToMyVocabulary()
    props.resetWord()
    setMyTry('')
    setCheck(null)
    setSolution('')
    props.newSearch('')
    setWordsToPractice([])
    setPracticing(false)
  }

  const practiceNextHandler = () => {
    saveWordToMyVocabulary()
    setMyTry('')
    setCheck(null)
    setSolution('')
    setNewWordToPractice()
  }

  const checkWordHandler = (event) => {
    event.preventDefault()
    if (props.word.lemma.toLowerCase() === myTry.toLowerCase()) {
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
        await chapterWordService.removeMany(idsToRemove)
        wordsToRemove.forEach(word => {props.removeChapterWord(word)})
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

  const removeChapterHandler = async () => {
    const message = t('ConfirmRemove')
    if (window.confirm(`${message} ${props.chapter.title}?`)) {
      try {
        await chapterService.remove(props.chapter.id)
        props.resetChapter()
        const msg = t('RemovalSucceeded')
        props.displayNotification({
          message: `${msg} ${props.chapter.title}`,
          messageType: 'success'
        })
        props.history.push('/chapters')
      } catch (error) {
        console.log(error.response)
        props.displayNotification({
          message: t('RemovalFailed'),
          messageType: 'danger'
        })
      }
    }
  }

  const returnHandler = () => {
    props.history.push('/chapters')
  }

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
        <Col lg={l} md={s} sm={s} xl={l} xs={s}>
          <div id="chapterContainer" className={marginB}>
            <h1 data-cy="chapter-title">{props.chapter.title}</h1>
            <p data-cy="chapter-body">{props.chapter.body}</p>
          </div>
        </Col>
        <Col lg={r} md={s} sm={s} xl={r} xs={s}>
          <div id="vocabularyContainer" className={marginB}>
            <div id="stickyWithPadding" className="stickyContainer">
              <h2 data-cy="vocabulary-title">{t('VocabularyTitle')}</h2>
              <ButtonToolbar className={marginB}>
                <SelectButton
                  selectAll={selectAllHandler}
                  selectNothing={selectNothingHandler}
                  selectLearned={selectLearnedHandler}
                  selectNotLearned={selectNotLearnedHandler}
                  size="sm" />
                <Button
                  variant={variantNormal}
                  className={marginR}
                  data-cy="practice-words-button"
                  disabled={nothingSelected}
                  onClick={practiceWordsHandler}
                  size="sm">{t('PracticeWordsButton')}</Button>
              </ButtonToolbar>
              <Search />
            </div>
            <div id="vocabulary">
              <Words
                words={vocabularyWordsToShow(props.chapter.words, props.search)}
                showDetails={showDetailsHandler}
                selectable="true"
                toggleChecked={toggleCheckedHandler} />
            </div>
            <WordDetails
              close={closeDetailsHandler}
              showNext={showNextHandler}
              displayToken
              edit={props.chapter.created_by === props.user.id} />
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
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={l} md={l} sm={l} xl={l} xs={l}>
          <ButtonToolbar>
            <Button
              variant={variantNormal}
              className={marginR}
              data-cy="return-to-chapters-button"
              onClick={returnHandler}>{t('ReturnButton')}
            </Button>
            {props.chapter.created_by === props.user.id && !props.chapter.public
              ? (<Button
                variant={variantNormal}
                className={marginR}
                data-cy="publish-chapter-button"
                onClick={publishChapterHandler}>{t('PublishChapterButton')}
              </Button>
              )
              : null
            }
            {props.chapter.created_by === props.user.id
              ? (<Fragment>
                <Button
                  variant={variantNormal}
                  className={marginR}
                  data-cy="edit-chapter-button"
                  href={`/edit/${props.chapter.id}`}>{t('EditChapterButton')}
                </Button>
                <Button
                  variant={variantDanger}
                  className={marginR}
                  data-cy="remove-chapter-button"
                  onClick={removeChapterHandler}>
                  {t('RemoveButton')}
                </Button>
              </Fragment>
              )
              : null
            }
          </ButtonToolbar>
        </Col>
        <Col lg={r} md={r} sm={r} xl={r} xs={r}>
          {props.chapter.created_by === props.user.id
            ? (<Fragment>
              <ChapterWordForm modal={modal} close={() => setModal(false)} />
              <ButtonToolbar>
                <Button
                  variant={variantNormal}
                  className={marginR}
                  data-cy="add-word-button"
                  onClick={() => setModal(true)}>
                  {t('AddWordFromDictionaryButton')}
                </Button>
                <Button
                  variant={variantDanger}
                  className={marginR}
                  data-cy="remove-words-button"
                  disabled={nothingSelected}
                  onClick={removeWordsHandler}>
                  {t('RemoveSelectedWordsButton')}
                </Button>
              </ButtonToolbar>
            </Fragment>
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
  resetChapter,
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Chapter)
)
