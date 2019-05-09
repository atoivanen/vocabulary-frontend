import React from 'react'
import {useTranslation} from 'react-i18next'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Notification from '../../UI/Notification/Notification'

const WordForm = (props) => {
  const {t} = useTranslation()

  const pos = props.pos ? props.pos : ''
  const gender = props.gender ? props.gender : ''

  return (
    <Form onSubmit={props.saveWord}>
      <Notification
        message={props.notification.message}
        messageType={props.notification.messageType} />
      <Form.Group controlId="formGroupLemma">
        <Form.Label>{t('WordLabel')}:</Form.Label>
        <Form.Control
          type="text"
          name="lemma"
          value={props.lemma}
          onChange={props.changed} />
      </Form.Group>
      <Form.Group controlId="formGroupTranslation">
        <Form.Label>{t('TranslationLabel')}:</Form.Label>
        <Form.Control
          type="text"
          name="translation"
          value={props.translation}
          onChange={props.changed} />
      </Form.Group>
      <Form.Group controlId="formGroupPOS">
        <Form.Label>{t('POSLabel')}:</Form.Label>
        <Form.Control
          as="select"
          name="pos"
          value={pos}
          onChange={props.changed}>
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
          onChange={props.changed}>
          <option value=""></option>
          <option value="f">{t('FeminineOption')}</option>
          <option value="m">{t('MasculineOption')}</option>
        </Form.Control>
      </Form.Group>
      <Button type="submit">{t('SubmitWordButton')}</Button>
    </Form>
  )
}

export default WordForm
