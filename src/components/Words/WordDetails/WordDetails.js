import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Form, Modal, Button, ButtonToolbar } from 'react-bootstrap'

import Notification from '../../UI/Notification/Notification'
import { setWord, resetWord } from '../../../reducers/wordReducer'
import { updateChapterWord, removeChapterWord } from '../../../reducers/chapterReducer'
import { displayNotification } from '../../../reducers/notificationReducer'
import chapterWordService from '../../../services/chapterWords'

const WordDetails = (props) => {
  const { t } = useTranslation()

  const variantNormal = 'outline-primary'
  const variantDanger = 'outline-danger'
  const marginR = 'mr-1'

  if (!props.word) {
    return null
  }

  let pos
  if (!props.word.pos) {
    pos = ''
  } else if (props.word.pos === 'ADJ') {
    pos = t('AdjectiveOption')
  } else if (props.word.pos === 'ADP') {
    pos = t('AdpositionOption')
  } else if (props.word.pos === 'ADV') {
    pos = t('AdverbOption')
  }  else if (props.word.pos === 'AUX') {
    pos = t('AuxiliaryOption')
  } else if (props.word.pos === 'CONJ') {
    pos = t('ConjunctionOption')
  } else if (props.word.pos === 'CCONJ') {
    pos = t('CConjunctionOption')
  }  else if (props.word.pos === 'DET') {
    pos = t('DeterminerOption')
  }  else if (props.word.pos === 'INTJ') {
    pos = t('InterjectionOption')
  }  else if (props.word.pos === 'NOUN') {
    pos = t('NounOption')
  } else if (props.word.pos === 'NUM') {
    pos = t('NumeralOption')
  } else if (props.word.pos === 'PART') {
    pos = t('ParticleOption')
  } else if (props.word.pos === 'PRON') {
    pos = t('PronounOption')
  } else if (props.word.pos === 'PROPN') {
    pos = t('PropernounOption')
  }  else if (props.word.pos === 'SCONJ') {
    pos = t('SconjunctionOption')
  }  else if (props.word.pos === 'VERB') {
    pos = t('VerbOption')
  } else if (props.word.pos === 'X') {
    pos = t('OtherOption')
  }

  let gender
  if (!props.word.gender) {
    gender = ''
  } else if (props.word.gender === 'f') {
    gender = t('FeminineOption')
  } else if (props.word.gender === 'm') {
    gender = t('MasculineOption')
  }

  const tokenChangedHandler = ({ target }) => {
    props.setWord({ ...props.word, token: target.value })
  }

  const saveWordHandler = async (event) => {
    event.preventDefault()
    const wordproperties = { token: props.word.token }
    try {
      await chapterWordService.update(props.word.id, wordproperties)
      props.updateChapterWord(props.word)
      props.close()
      props.displayNotification({
        message: t('WordSavedSuccessfully'),
        messageType: 'success'
      })
    } catch (error) {
      console.log(error.response)
      props.displayNotification({
        message: t('ErrorWhenSaving'),
        messageType: 'danger'
      })
    }
  }

  const removeWordHandler = async () => {
    const message = t('ConfirmRemove')
    if (window.confirm(`${message} ${props.word.lemma}?`)) {
      try {
        await chapterWordService.remove(props.word.id)
        props.removeChapterWord(props.word)
        props.close()
        const msg = t('RemovalSucceeded')
        props.displayNotification({
          message: `${msg} ${props.word.lemma}`,
          messageType: 'success'
        })
        props.resetWord()
      } catch (error) {
        console.log(error.response)
        props.displayNotification({
          message: t('RemovalFailed'),
          messageType: 'danger'
        })
      }
    }
  }

  return (
    <Modal show={props.modal} onHide={props.close} data-cy="word-details-modal">
      <Modal.Header closeButton>
        <Modal.Title>{props.word.lemma}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={saveWordHandler}>
          <Notification />
          <Form.Group>
            <Form.Label>{t('WordLabel')}:</Form.Label>
            <Form.Control readOnly value={props.word.lemma} />
          </Form.Group>
          { props.displayToken
            ? (<Fragment>
              <Form.Group>
                <Form.Label>{t('TokenLabel')}:</Form.Label>
                <Form.Control
                  type="text"
                  readOnly={!props.edit}
                  value={props.word.token}
                  onChange={(event) => tokenChangedHandler(event)} />
              </Form.Group>
            </Fragment>
            )
            : null
          }
          <Form.Group>
            <Form.Label>{t('TranslationLabel')}:</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={props.word.translation} />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('PronunciationLabel')}:</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={props.word.pronunciation ? props.word.pronunciation : ''} />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('POSLabel')}:</Form.Label>
            <Form.Control type="text" readOnly value={pos} />
          </Form.Group>
          { props.word.pos === 'NOUN'
            ? (<Form.Group>
              <Form.Label>{t('GenderLabel')}:</Form.Label>
              <Form.Control type="text" readOnly value={gender} />
            </Form.Group>)
            : null
          }
          <Form.Group>
            <label>
              <input
                type="checkbox"
                checked={props.word.learned ? props.word.learned : false}
                readOnly
                id="learned"/>
              {t('LearnedLabel')}
            </label>
          </Form.Group>
          { props.edit
            ? (<ButtonToolbar className="float-left">
              <Button
                className={marginR}
                variant={variantNormal}
                data-cy="save-word-button"
                type="submit">{t('SubmitWordButton')}</Button>
              <Button
                className={marginR}
                variant={variantDanger}
                data-cy="remove-word-button"
                onClick={removeWordHandler}>{t('RemoveButton')}</Button>
            </ButtonToolbar>
            )
            : null
          }
          <ButtonToolbar className="float-right">
            <Button
              className={marginR}
              variant={variantNormal}
              data-cy="previous-word-button"
              name="previous"
              onClick={props.showNext}>{t('PreviousButton')}</Button>
            <Button
              className={marginR}
              variant={variantNormal}
              data-cy="next-word-button"
              name="next"
              onClick={props.showNext}>{t('NextButton')}</Button>
          </ButtonToolbar>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    word: state.word,
    modal: state.modal
  }
}

const mapDispatchToProps = {
  setWord,
  resetWord,
  updateChapterWord,
  removeChapterWord,
  displayNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordDetails)
