import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Col, Row, Table, Button, ButtonToolbar, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import Search from '../Search/Search'
import { newSearch } from '../../reducers/searchReducer'
import { makeComparable } from '../../helpers/helpers'
import {
  initializeChapters,
  updateChapter,
  removeChapter
} from '../../reducers/chaptersReducer'
import { displayNotification } from '../../reducers/notificationReducer'
import chapterService from '../../services/chapters'

const Chapters = (props) => {
  const [loading, setLoading] = useState(false)
  const [nothingSelected, setNothingSelected] = useState(true)

  const { t } = useTranslation()

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
        await props.initializeChapters()
      } catch (error) {
        console.log(error.response)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const setStateNothingSelected = () => {
    props.chapters.find(c => c.selected)
      ? setNothingSelected(false)
      : setNothingSelected(true)
  }

  const toggleChecked = (event) => {
    const id = Number(event.target.name)
    const updatedChapter = props.chapters.find(c => c.id === id)
    updatedChapter.selected = !updatedChapter.selected
    setStateNothingSelected()
    props.updateChapter(updatedChapter)
  }

  const removeChapters = async () => {
    const chaptersToRemove = props.chapters.filter(c => c.selected)
    const titlesToRemove = chaptersToRemove.map(c => c.title)
    const idsToRemove = chaptersToRemove.map(c => c.id)
    let titles = titlesToRemove[0]
    if (titlesToRemove.length > 1) {
      titlesToRemove.shift()
      titles = titlesToRemove.reduce((acc, cur) =>
        `${acc}, ${cur}`, titles
      )
    }
    const message = t('ConfirmRemove')
    if (window.confirm(`${message} ${titles}?`)) {
      try {
        await chapterService.removeMany(idsToRemove)
        chaptersToRemove.forEach(chapter => {props.removeChapter(chapter)})
        if (chaptersToRemove.length > 0) {
          const chaptersRemoved = t('ChaptersRemovedMessage')
          props.displayNotification({
            message: `${chaptersRemoved} ${titles}`,
            messageType: 'success'
          })
          setNothingSelected(true)
        }
      } catch (error) {
        console.log(error.response)
        if (error.response.request.status === 404) {
          chaptersToRemove.forEach(chapter => {props.removeChapter(chapter)})
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

  return (
    <Fragment>
      <Row>
        <Col lg={l} md={l} sm={s} xl={l}  xs={s}>
          <h1>{t('ChaptersPageTitle')}</h1>
          {props.user.id
            ? (
              <ButtonToolbar className={marginB}>
                <Button href="/new" className={marginR} variant={variantNormal}>
                  {t('CreateNewChapterButton')}
                </Button>
                {props.visibleChapters.find(c => c.created_by === props.user.id)
                  ? (<Button
                    className={marginR}
                    variant={variantDanger}
                    disabled={nothingSelected}
                    onClick={removeChapters}>
                    {t('RemoveSelectedChaptersButton')}
                  </Button>
                  )
                  : null
                }
              </ButtonToolbar>
            )
            : null
          }
          <Search />
          <div className="scrollableArea">
            <Table borderless>
              <tbody>
                {props.visibleChapters.map(chapter =>
                  <tr key={chapter.id}>
                    {props.user.id === chapter.created_by
                      ? (<td>
                        <input
                          type="checkbox"
                          name={chapter.id}
                          onClick={toggleChecked} />
                      </td>
                      )
                      : null
                    }
                    <td>
                      <a href={`/chapters/${chapter.id}`}>
                        {chapter.title}
                      </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Fragment>
  )
}

const chaptersToShow = (chapters, search) => {
  const filteredChapters = chapters.filter(chapter => {
    const comparableTitle = makeComparable(chapter.title)
    const comparableSearch = makeComparable(search)
    return (comparableTitle.includes(comparableSearch))
  })

  return filteredChapters
}

const mapStateToProps = (state) => {
  return {
    visibleChapters: chaptersToShow(state.chapters, state.search),
    user: state.user,
    search: state.search
  }
}

const mapDispatchToProps = {
  initializeChapters,
  updateChapter,
  removeChapter,
  displayNotification,
  newSearch
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chapters)
