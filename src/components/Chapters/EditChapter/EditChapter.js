import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Col, Row } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import ChapterForm from '../ChapterForm/ChapterForm'
import { setBody, setTitle } from '../../../reducers/chapterReducer'
import { displayNotification } from '../../../reducers/notificationReducer'
import { initializeChapter } from '../../../reducers/chapterReducer'
import chapterService from '../../../services/chapters'

const EditChapter = (props) => {
  useEffect(() => {
    props.initializeChapter(props.id)
  }, [])

  const { t } = useTranslation()

  const changeTitleHandler = (event) => {
    props.setTitle(event.target.value)
  }

  const changeTextHandler = (event) => {
    props.setBody(event.target.value)
  }

  const saveChapterHandler = async (event) => {
    event.preventDefault()
    const updatedChapter = {
      title: props.chapter.title,
      body: props.chapter.body
    }
    try {
      await chapterService.update(props.chapter.id, updatedChapter)
      props.displayNotification({
        message: t('SavingSucceeded'),
        messageType: 'success'
      })
      props.history.push(`/chapters/${props.chapter.id}`)
    } catch (error) {
      console.log(error.reponse)
      props.displayNotification({
        message: t('SavingFailed'),
        messageType: 'danger'
      })
    }
  }

  const cancelHandler = () => {
    props.history.push(`/chapters/${props.chapter.id}`)
  }

  const l = 8
  const s = 12

  if (!props.chapter.id) {
    return null
  }

  if (props.chapter.created_by !== props.user.id) {
    return <p>{t('EditingNotAllowed')}</p>
  }

  return (
    <Row>
      <Col lg={l} md={l} sm={s} xl={l}  xs={s}>
        <ChapterForm
          saveChapter={saveChapterHandler}
          cancel={cancelHandler}
          title={props.chapter.title}
          textArea={props.chapter.body}
          setTitle={changeTitleHandler}
          setText={changeTextHandler} />
      </Col>
    </Row>
  )
}

const mapStateToProps = (state) => {
  return {
    chapter: state.chapter,
    user: state.user
  }
}

const mapDispatchToProps = {
  setBody,
  setTitle,
  displayNotification,
  initializeChapter
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditChapter)
)
