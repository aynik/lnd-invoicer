import React from 'react'
import Router from 'next/router'
import { NextAuth } from 'next-auth/client'
import { NavItem, NavLink } from 'reactstrap'
import Authentication from '../containers/Authentication'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Jumbotron from '../components/Jumbotron'
import Instructions from '../components/Instructions'
import Footer from '../components/Footer'

export default class extends React.Component {
  static async getInitialProps ({ req, query: {}}) {
    const { csrfToken, user } = await NextAuth.init({ req })
    return {
      csrfToken,
      user
    }
  }

  render () {
    return (
      <Layout>
        <Header>
          <Authentication
            csrfToken={this.props.csrfToken}
            user={this.props.user}> 
              { this.props.user && this.props.user.alias ?
                <NavItem>
                  <NavLink href={`/${this.props.user.alias}`}>My link</NavLink>
                </NavItem> :
                <NavItem>
                  <NavLink href="/link-up">Link up!</NavLink>
                </NavItem> }
          </Authentication>
        </Header> 
        <Jumbotron />
        <Instructions />
        <Footer />
      </Layout>
    )
  }
}
