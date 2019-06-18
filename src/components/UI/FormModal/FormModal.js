import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'

const FormModal = (props) => {

  return (
    <div>
      <Modal show={props.modal} onHide={props.close}>
        <Modal.Header closeButton>
          {props.title
            ? <Modal.Title>{props.title}</Modal.Title>
            : null
          }
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
