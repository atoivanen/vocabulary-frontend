import React from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Button } from 'react-bootstrap'

import Notification from '../../UI/Notification/Notification'

const WordForm = ({ word, changed, saveWord, notification }) => {
  const { t } = useTranslation()

  if (!word) {
    return null
  }

  const pos = word.pos ? word.pos : ''
  const gender = word.gender ? word.gender : ''

  return (
    <Form onSubmit={saveWord}>
      <Notification
        message={notification.message}
        messageType={notification.messageType} />
      <Form.Group controlId="formGroupLemma">
        <Form.Label>{t('WordLabel')}:</Form.Label>
        <Form.Control
          type="text"
          name="lemma"
          value={word.lemma}
          onChange={changed} />
      </Form.Group>
      <Form.Group controlId="formGroupTranslation">
        <Form.Label>{t('TranslationLabel')}:</Form.Label>
        <Form.Control
          type="text"
          name="translation"
          value={word.translation}
          onChange={changed} />
      </Form.Group>
      <Form.Group controlId="formGroupPOS">
        <Form.Label>{t('POSLabel')}:</Form.Label>
        <Form.Control
          as="select"
          name="pos"
          value={pos}
          onChange={changed}>
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
          onChange={changed}>
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
