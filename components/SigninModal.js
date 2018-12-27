import React from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap'
import {
  SigninInstructions,
  SigninForm
} from '../components'

export default ({ isOpen, csrfToken, onToggleOpen, onSubmit }) => (
  <Modal isOpen={isOpen} toggle={onToggleOpen} autoFocus={false}>
    <ModalHeader toggle={onToggleOpen}>Sign in with your email</ModalHeader>
    <ModalBody>
      <SigninInstructions />
      <SigninForm
        csrfToken={csrfToken}
        onSubmit={onSubmit} />
    </ModalBody>
  </Modal>
)
