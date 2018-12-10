import React from 'react'
import Router from 'next/router'
import { NextAuth } from 'next-auth/client'
import { NavItem, NavLink, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SigninModal from '../components/SigninModal'
import SignoutForm from '../components/SignoutForm'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSigninModalOpen: false,
      isSigninModalError: null
    }
  }

  toggleSigninModalOpen () {
    this.setState({
      isSigninModalOpen: !this.state.isSigninModalOpen,
      loginModalError: null 
    })
  }

  submitSigninModalForm (event) {
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

  submitSignoutForm (event) {
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
        <React.Fragment>
          {this.props.children} 
          <NavItem>
            <SignoutForm
              csrfToken={this.props.csrfToken}
              onSubmit={(event) => this.submitSignoutForm(event)} /> 
          </NavItem>
        </React.Fragment> :
        <NavItem>
          <Button
            color='primary'
            onClick={() => this.toggleSigninModalOpen()}>
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
            onToggleOpen={() => this.toggleSigninModalOpen()}
            onSubmit={(event) => this.submitSigninModalForm(event)} />
        </NavItem>
    )
  }
}
