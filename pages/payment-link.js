import React from 'react'
import Router from 'next/router'
import { NextAuth } from 'next-auth/client'
import { NavItem, NavLink, Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Authentication from '../containers/Authentication'
import RequestInvoiceForm from '../containers/RequestInvoiceForm'
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

  render () {
    return (
      <Layout>
        <Header>
          { this.props.user &&
            this.props.user.alias === this.props.alias &&
            <NavItem>
              <NavLink href="/link-up">
                <FontAwesomeIcon
                  icon='edit'
                  className='mr-2 pointer' />
                Edit link
              </NavLink>
            </NavItem> }
          <Authentication
            csrfToken={this.props.csrfToken}
            user={this.props.user} /> 
        </Header>
        <RequestInvoiceForm
          alias={this.props.alias} />
        <Footer />
      </Layout>
    )
  }
}
