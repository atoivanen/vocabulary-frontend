import React, {Fragment} from 'react'
import { Modal, Button } from 'react-bootstrap'

import Backdrop from '../Backdrop/Backdrop'

const FormModal = (props) => {
  return (
    <Fragment>
      <Backdrop show={props.showModal} clicked={props.close} />
      <Modal show={props.showModal} onHide={props.close}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {props.children}
        </Modal.Body>

        <Modal.Footer>
          <Button
            as="input"
            name="previous"
            size="sm"
            onClick={props.next}
            value="<" />
          <Button
            as="input"
            name="next"
            size="sm"
            onClick={props.next}
            value=">" />
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}

export default FormModal
