import React from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Form, Modal, Button, ButtonToolbar } from 'react-bootstrap'

const WordDetails = (props) => {
  const { t } = useTranslation()

  if (!props.word) {
    return null
  }

  const wordForms = props.word.token
    ? `${props.word.lemma} (${props.word.token})`
    : props.word.lemma

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
  }  else if (props.word.pos === 'CCONJ') {
    pos = t('CConjunctionOption')
  }  else if (props.word.pos === 'DET') {
    pos = t('DeterminerOption')
  }  else if (props.word.pos === 'INTJ') {
    pos = t('InterjectionOption')
  }  else if (props.word.pos === 'NOUN') {
    pos = t('NounOption')
  }  else if (props.word.pos === 'PRON') {
    pos = t('PronounOption')
  }  else if (props.word.pos === 'PROPN') {
    pos = t('PropernounOption')
  }  else if (props.word.pos === 'SCONJ') {
    pos = t('SconjunctionOption')
  }  else if (props.word.pos === 'VERB') {
    pos = t('VerbOption')
  }

  let gender
  if (!props.word.gender) {
    gender = ''
  } else if (props.word.gender === 'f') {
    gender = t('FeminineOption')
  } else if (props.word.gender === 'm') {
    gender = t('MasculineOption')
  }

  const displayGender = props.word.pos === 'NOUN'
    ? (<Form.Group>
      <Form.Label>{t('GenderLabel')}:</Form.Label>
      <Form.Control readOnly value={gender} />
    </Form.Group>)
    : null

  return (
    <Modal show={props.modal} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>{props.word.lemma}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>{t('WordLabel')}:</Form.Label>
            <Form.Control readOnly value={wordForms} />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('TranslationLabel')}:</Form.Label>
            <Form.Control
              readOnly
              value={props.word.translation} />
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('POSLabel')}:</Form.Label>
            <Form.Control readOnly value={pos} />
          </Form.Group>
          {displayGender}
          <label>
            <input
              type="checkbox"
              checked={props.word.learned ? props.word.learned : false}
              readOnly
              id="learned"/>
            {t('LearnedLabel')}
          </label>
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

export default connect(
  mapStateToProps
)(WordDetails)
