import React from 'react'
import Router from 'next/router'
import axios from 'axios'
import { NextAuth } from 'next-auth/client'
import { NavItem, NavLink, Button } from 'reactstrap'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Authentication from '../containers/Authentication'
import RequestInvoiceForm from '../components/RequestInvoiceForm'
import Footer from '../components/Footer'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      payReq: null
    }
  }

  static async getInitialProps({ req, res, query }) {
    const { csrfToken, user } = await NextAuth.init({ req })
    const { alias } = req.params
    return {
      csrfToken,
      user,
      alias
    }
  }

  submitSignoutForm(event) {
    event.preventDefault()
    NextAuth.signout()
      .then(() => {
        Router.push('/auth/callback')
      })
      .catch(err => {
        Router.push('/auth/error?action=signout')
      })
  }

  async submitRequestInvoice(amount) {
    await axios
      .get(`/${this.props.alias}/invoice?amount=${amount}`)
      .then((res) => {
	this.setState({
          payReq: res.data 
        })
      })
      .catch(err => {
	console.log('Payment request fetch failed', err);
      })
  }

  render () {
    return (
      <Layout>
        <Header>
          { this.props.user &&
            this.props.user.alias === this.props.alias &&
            <NavItem>
              <NavLink href="/link-up">Edit link</NavLink>
            </NavItem> }
          <Authentication
            csrfToken={this.props.csrfToken}
            user={this.props.user} /> 
        </Header>
        <RequestInvoiceForm
          alias={this.props.alias}
          payReq={this.state.payReq}
          onSubmit={(amount) => this.submitRequestInvoice(amount)} />
        <Footer />
      </Layout>
    )
  }
}
