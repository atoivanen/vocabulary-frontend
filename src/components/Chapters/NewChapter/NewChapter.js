import React, { useState } from 'react'
import { Row, Col, Modal, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'

import ChapterForm from '../ChapterForm/ChapterForm'
import chapterService from '../../../services/chapters'
import { displayNotification } from '../../../reducers/notificationReducer'

const NewChapter = (props) => {
  const [title, setTitle] = useState('')
  const [textArea, setTextArea] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const { t } = useTranslation()

  const source_lang = 'fr'
  const target_lang = 'fi'

  const l = 8
  const s = 12

  const titleHandler = (event) => {
    setTitle(event.target.value)
  }

  const textAreaHandler = (event) => {
    setTextArea(event.target.value)
  }

  const createChapterHandler = async (event) => {
    event.preventDefault()
    const newChapter = {
      title,
      body: textArea,
      source_lang,
      target_lang,
      created_by: props.user.id,
      public: false
    }
    try {
      setAnalyzing(true)
      const response = await chapterService.create(newChapter)
      setTitle('')
      setTextArea('')
      setAnalyzing(false)
      props.history.push(`/chapters/${response.id}`)
    } catch (error) {
      setAnalyzing(false)
      console.log(error.response)
      if (error.response.status === 503) {
        props.displayNotification({
          message: t('ChapterCreationFailedMemoryLimitation'),
          messageType: 'danger'
        })
        props.history.push('/chapters/')
      }
      else {
        props.displayNotification({
          message: t('ChapterCreationFailed'),
          messageType: 'danger'
        })
      }
    }
  }

  const closeModalHandler = () => {
    // do nothing
  }

  const cancelHandler = () => {
    setTitle('')
    setTextArea('')
    props.history.push('/chapters')
  }

  if (!props.user.id) {
    return <Redirect to="/login" />
  }

  return (
    <Row>
      <Col lg={l} md={l} sm={s} xl={l}  xs={s}>
        <ChapterForm
          saveChapter={createChapterHandler}
          cancel={cancelHandler}
          setText={textAreaHandler}
          setTitle={titleHandler}
          title={title}
          textArea={textArea} />
        <Modal size="sm" show={analyzing} onHide={closeModalHandler}>
          <Modal.Body>
            <Spinner animation="border" />
            {t('AnalyzingMessage')}
          </Modal.Body>
        </Modal>
        <footer>
          <a href="https://spacy.io">
            <img
              src="https://img.shields.io/badge/made%20with%20❤%20and-spaCy-09a3d5.svg"
              alt="made with love and spaCy"
              height="20" />
          </a>
        </footer>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chapter: state.chapter
  }
}

const mapDispatchToProps = {
  displayNotification
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewChapter)
)
