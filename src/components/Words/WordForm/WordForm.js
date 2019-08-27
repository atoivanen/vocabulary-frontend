import React from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Form, Button, ButtonToolbar, Modal } from 'react-bootstrap'

import Notification from '../../UI/Notification/Notification'

import {
  updateDictionary,
  addWordToDictionary,
  removeWordFromDictionary
} from '../../../reducers/dictionaryReducer'
import { setWord, resetWord } from '../../../reducers/wordReducer'
import { displayNotification } from '../../../reducers/notificationReducer'
import { openModal, closeModal } from '../../../reducers/modalReducer'
import { isNotNew } from '../../../reducers/newReducer'
import { newSearch } from '../../../reducers/searchReducer'

import wordService from '../../../services/words'

const WordForm = (props) => {
  const { t } = useTranslation()

  if (!props.word) {
    return null
  }

  const validate = () => {
    if (!props.word.lemma) {
      props.displayNotification({
        message: t('WordIsMissingMessage'),
        messageType: 'danger'
      })
      return false
    }
    if (!props.word.translation) {
      props.displayNotification({
        message: t('TranslationIsMissingMessage'),
        messageType: 'danger'
      })
      return false
    }
    if (!props.word.pos) {
      props.displayNotification({
        message: t('POSIsMissingMessage'),
        messageType: 'danger'
      })
      return false
    }
    if (props.word.pos === 'NOUN' && !props.word.gender) {
      props.displayNotification({
        message: t('GenderIsMissingMessage'),
        messageType: 'danger'
      })
      return false
    }
    return true
  }

  const saveWord = async (event) => {
    event.preventDefault()
    if (validate(props.word)) {
      if (!props.new) {
        try {
          const updatedWord = {
            ...props.word,
            modified_by: props.user.id,
            gender: props.word.gender ? props.word.gender : null
          }
          const returnedWord = await wordService.update(
            props.word.id,
            updatedWord
          )
          props.resetWord()
          props.closeModal()
          props.updateDictionary(returnedWord)
          props.displayNotification({
            message: t('WordSavedSuccessfully'),
            messageType: 'success'
          })
        } catch(error) {
          console.log(error.response)
          props.displayNotification({
            message: t('ErrorWhenSaving'),
            messageType: 'danger'
          })
        }
      } else {
        try {
          const newWord = {
            ...props.word,
            created_by: props.user.id,
            gender: props.word.gender ? props.word.gender : null
          }
          const returnedWord = await wordService.create(newWord)
          props.isNotNew()
          props.resetWord()
          props.closeModal()
          props.newSearch(returnedWord.lemma)
          props.addWordToDictionary(returnedWord)
          props.displayNotification({
            message: t('WordSavedSuccessfully'),
            messageType: 'success'
          })
        } catch(error) {
          console.log(error.response)
          if (error.request.status === 400) {
            props.displayNotification({
              message: t('WordExists'),
              messageType: 'danger'
            })
          } else {
            props.displayNotification({
              message: t('ErrorWhenSaving'),
              messageType: 'danger'
            })
          }
        }
      }
    }
  }

  const changeValue = (event) => {
    const updatedWord = { ...props.word }
    const property = event.target.name
    updatedWord[property] = event.target.value
    props.setWord(updatedWord)
  }

  const deleteWordHandler = async () => {
    const message = t('ConfirmRemove')
    if (window.confirm(`${message} ${props.word.lemma}?`)) {
      try {
        await wordService.remove(props.word.id)
        props.removeWordFromDictionary(props.word)
        const msg = t('RemovalSucceeded')
        props.displayNotification({
          message: `${msg} ${props.word.lemma}`,
          messageType: 'success'
        })
        props.resetWord()
        props.close()
      } catch (error) {
        console.log(error.response)
        props.displayNotification({
          message: t('RemovalFailed'),
          messageType: 'danger'
        })
      }
    }
  }

  const pos = props.word.pos ? props.word.pos : ''
  const gender = props.word.gender ? props.word.gender : ''

  return (
    <Modal show={props.modal} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>{props.word.lemma}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={saveWord}>
          <Notification />
          <Form.Group controlId="formGroupLemma">
            <Form.Label>{t('WordLabel')}:</Form.Label>
            <Form.Control
              type="text"
              name="lemma"
              value={props.word.lemma}
              readOnly={!props.user.id}
              onChange={(event) => changeValue(event)} />
          </Form.Group>
          <Form.Group controlId="formGroupTranslation">
            <Form.Label>{t('TranslationLabel')}:</Form.Label>
            <Form.Control
              type="text"
              name="translation"
              value={props.word.translation}
              readOnly={!props.user.id}
              onChange={(event) => changeValue(event)} />
          </Form.Group>
          <Form.Group controlId="formGroupPOS">
            <Form.Label>{t('POSLabel')}:</Form.Label>
            <Form.Control
              as="select"
              name="pos"
              value={pos}
              readOnly={!props.user.id}
              onChange={(event) => changeValue(event)}>
              <option value="ADJ">{t('AdjectiveOption')}</option>
              <option value="ADP">{t('AdpositionOption')}</option>
              <option value="ADV">{t('AdverbOption')}</option>
              <option value="AUX">{t('AuxiliaryOption')}</option>
              <option value="CCONJ">{t('CConjunctionOption')}</option>
              <option value="DET">{t('DeterminerOption')}</option>
              <option value="INTJ">{t('InterjectionOption')}</option>
              <option value="NOUN">{t('NounOption')}</option>
              <option value="PRON">{t('PronounOption')}</option>
              <option value="PROPN">{t('PropernounOption')}</option>
              <option value="SCONJ">{t('SconjunctionOption')}</option>
              <option value="VERB">{t('VerbOption')}</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formGroupGender">
            <Form.Label>{t('GenderLabel')}:</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={gender}
              readOnly={!props.user.id}
              onChange={(event) => changeValue(event)}>
              <option value=""></option>
              <option value="f">{t('FeminineOption')}</option>
              <option value="m">{t('MasculineOption')}</option>
            </Form.Control>
          </Form.Group>
          {props.user.id
            ? (<ButtonToolbar className="float-left">
              <Button type="submit">{t('SubmitWordButton')}</Button>
              {props.user.id === props.word.created_by
                ? <Button
                  variant="danger"
                  onClick={deleteWordHandler}>{t('RemoveButton')}</Button>
                : null
              }
            </ButtonToolbar>)
            : null
          }
          {props.showNextAllowed
            ? (
              <ButtonToolbar className="float-right">
                <Button
                  as="input"
                  name="previous"
                  onClick={props.showNext}
                  value={t('PreviousButton')} />
                <Button
                  as="input"
                  name="next"
                  onClick={props.showNext}
                  value={t('NextButton')} />
              </ButtonToolbar>
            ) : null
          }
        </Form>
      </Modal.Body>
    </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    word: state.word,
    new: state.new,
    modal: state.modal,
    user: state.user
  }
}

const mapDispatchToProps = {
  updateDictionary,
  addWordToDictionary,
  removeWordFromDictionary,
  setWord,
  resetWord,
  displayNotification,
  newSearch,
  openModal,
  closeModal,
  isNotNew
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordForm)
