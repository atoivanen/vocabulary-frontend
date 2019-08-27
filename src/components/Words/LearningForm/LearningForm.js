import React from 'react'
import { Form, Modal, Button, ButtonToolbar, Image, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const LearningForm = (props) => {
  const { t } = useTranslation()

  const variantNormal = 'outline-primary'
  const marginR = 'mr-1'
  const marginY = 'my-2'

  return (
    <div>
      <Modal show={props.practicing} onHide={props.stopPracticing}>
        <Modal.Header closeButton />
        <Modal.Body>
          <p>{props.word.translation}</p>
          <Form onSubmit={props.checkWord}>
            <Form.Row>
              <Col>
                <Form.Control
                  value={props.myTry}
                  placeholder={t('TranslationPlaceholder')}
                  onChange={props.change} />
              </Col>
              <Col>
                {props.check ? <Image src={props.check} /> : null}
              </Col>
            </Form.Row>
            {props.solution
              ? <Form.Control
                plaintext
                readOnly
                defaultValue={props.solution} />
              : null
            }
            <ButtonToolbar className={marginY}>
              <Button
                className={marginR}
                variant={variantNormal}
                disabled={props.disabled}
                type="submit">{t('CheckButton')}
              </Button>
              <Button
                className={marginR}
                variant={variantNormal}
                disabled={props.disabled}
                onClick={props.next}>{t('NextButton')}
              </Button>
            </ButtonToolbar>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default LearningForm
