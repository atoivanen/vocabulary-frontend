import React from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Modal, Button } from 'react-bootstrap'

import Backdrop from '../Backdrop/Backdrop'

const FormModal = (props) => {
  const { t } = useTranslation()
  const modalTitle = t('EditWordModalTitle')

  return (
    <div>
      <Backdrop show={props.modal} clicked={props.close} />
      <Modal show={props.modal} onHide={props.close}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {props.children}
        </Modal.Body>

        <Modal.Footer>
          <Button
            as="input"
            name="previous"
            size="sm"
            onClick={props.showNext}
            value="<" />
          <Button
            as="input"
            name="next"
            size="sm"
            onClick={props.showNext}
            value=">" />
        </Modal.Footer>
      </Modal>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal
  }
}

export default connect(
  mapStateToProps
)(FormModal)
