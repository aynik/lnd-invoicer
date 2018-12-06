import React from 'react'
import SigninInstructions from '../components/SigninInstructions'
import SigninForm from '../components/SigninForm'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

export default ({ isOpen, csrfToken, onToggleOpen, onSubmit }) => (
  <Modal isOpen={isOpen} toggle={onToggleOpen}>
    <ModalHeader toggle={onToggleOpen}>Sign in with your email</ModalHeader>
    <ModalBody>
      <SigninInstructions />
      <SigninForm
        csrfToken={csrfToken}
        onSubmit={onSubmit} />
    </ModalBody>
  </Modal>
)
