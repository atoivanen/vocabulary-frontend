import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const modal = (props) => (
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
)

export default modal;
