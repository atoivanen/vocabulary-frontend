import React from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Form, Button } from 'react-bootstrap'

import Notification from '../../UI/Notification/Notification'

import { updateWords, addWord } from '../../../reducers/wordsReducer'
import { setWord, resetWord} from '../../../reducers/wordReducer'
import { displayNotification } from '../../../reducers/notificationReducer'
import { openModal, closeModal } from '../../../reducers/modalReducer'
import { isNotNew } from '../../../reducers/newReducer'

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
          const returnedWord = await wordService.update(
            props.word.id,
            props.word
          )
          props.resetWord()
          props.closeModal()
          props.updateWords(returnedWord)
          props.displayNotification({
            message: t('WordSavedSuccessfully'),
            messageType: 'success'
          })
        } catch(error) {
          console.log(error)
          props.displayNotification({
            message: t('ErrorWhenSaving'),
            messageType: 'danger'
          })
        }
      } else {
        try {
          const returnedWord = await wordService.create(props.word)
          props.isNotNew()
          props.resetWord()
          props.closeModal()
          props.addWord(returnedWord)
          displayNotification({
            message: t('WordSavedSuccessfully'),
            messageType: 'success'
          })
        } catch(error) {
          console.log(error)
          displayNotification({
            message: t('ErrorWhenSaving'),
            messageType: 'danger'
          })
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

  const pos = props.word.pos ? props.word.pos : ''
  const gender = props.word.gender ? props.word.gender : ''

  return (
    <Form onSubmit={saveWord}>
      <Notification />
      <Form.Group controlId="formGroupLemma">
        <Form.Label>{t('WordLabel')}:</Form.Label>
        <Form.Control
          type="text"
          name="lemma"
          value={props.word.lemma}
          onChange={(event) => changeValue(event)} />
      </Form.Group>
      <Form.Group controlId="formGroupTranslation">
        <Form.Label>{t('TranslationLabel')}:</Form.Label>
        <Form.Control
          type="text"
          name="translation"
          value={props.word.translation}
          onChange={(event) => changeValue(event)} />
      </Form.Group>
      <Form.Group controlId="formGroupPOS">
        <Form.Label>{t('POSLabel')}:</Form.Label>
        <Form.Control
          as="select"
          name="pos"
          value={pos}
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
          onChange={(event) => changeValue(event)}>
          <option value=""></option>
          <option value="f">{t('FeminineOption')}</option>
          <option value="m">{t('MasculineOption')}</option>
        </Form.Control>
      </Form.Group>
      <Button type="submit">{t('SubmitWordButton')}</Button>
    </Form>
  )
}

const mapStateToProps = (state) => {
  return {
    word: state.word,
    new: state.new
  }
}

const mapDispatchToProps = {
  updateWords,
  addWord,
  setWord,
  resetWord,
  displayNotification,
  openModal,
  closeModal,
  isNotNew
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordForm)
