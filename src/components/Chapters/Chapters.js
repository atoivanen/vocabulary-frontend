import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Col, ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useTranslation } from 'react-i18next'

import Notification from '../UI/Notification/Notification'

import { initializeChapters } from '../../reducers/chaptersReducer'

const Chapters = (props) => {
  const { t } = useTranslation()
  const chaptersTitle = t('ChaptersPageTitle')

  const l = 8
  const s = 12

  useEffect(() => {
    props.initializeChapters()
  }, [])

  return (
    <Fragment>
      <Col lg={l} md={l} sm={s} xl={l}  xs={s}>
        <Notification />
        <h1>{chaptersTitle}</h1>
        <ListGroup variant="flush">
          {props.chapters.map(chapter =>
            <LinkContainer
              to={`/chapters/${chapter.id}`}
              key={chapter.id}
              style={ ({ cursor: 'pointer' }) }>
              <ListGroup.Item>
                {chapter.title}
              </ListGroup.Item>
            </LinkContainer>
          )}
        </ListGroup>
      </Col>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    chapters: state.chapters,
  }
}

const mapDispatchToProps = {
  initializeChapters,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chapters)
