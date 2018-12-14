import React from 'react'
import Router from 'next/router'
import { NextAuth } from 'next-auth/client'
import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'
import {
  NavItem,
  NavLink,
  Button
} from 'reactstrap'
import {
  SigninModal,
  SignoutForm
} from '../components'

export default class extends React.Component {
  state = {
    isSigninModalOpen: false,
    isSigninModalError: null
  }

  toggleSigninModalOpen = () => (
    this.setState({
      isSigninModalOpen: !this.state.isSigninModalOpen,
      loginModalError: null
    })
  )

  submitSigninModalForm = (event) => {
    event.preventDefault()
    const email = event.target.email.value

    if (!email) return

    NextAuth.signin(email)
      .then(() => {
        this.setState({
          isSigninModalOpen: !this.state.isSigninModalOpen
        })
        Router.push(`/auth/check-email?email=${email}`)
      })
      .catch(err => {
        Router.push(`/auth/error?action=signin&type=email&email=${email}`)
      })
  }

  submitSignoutForm = (event) => {
    event.preventDefault()
    NextAuth.signout()
      .then(() => {
        Router.push('/auth/callback')
      })
      .catch(err => {
        Router.push('/auth/error?action=signout')
      })
  }

  render () {
    return (
      this.props.user ?
        <>
          {this.props.children}
          <NavItem>
            <SignoutForm
              csrfToken={this.props.csrfToken}
              onSubmit={this.submitSignoutForm} />
          </NavItem>
        </> :
        <NavItem>
          <Button
            color='primary'
            onClick={toggleSigninModalOpen}>
              <FontAwesomeIcon
                icon='sign-in-alt'
                className='mr-2 pointer' />
              Sign up / Sign in
          </Button>
          <SigninModal
            error={this.state.loginModalError}
            csrfToken={this.props.csrfToken}
            isOpen={this.state.isSigninModalOpen}
            isSubmitting={this.state.isSigninModalSubmitting}
            onToggleOpen={this.toggleSigninModalOpen}
            onSubmit={this.submitSigninModalForm} />
        </NavItem>
    )
  }
}
