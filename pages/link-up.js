import React from 'react'
import Router from 'next/router'
import {
  NextAuth
} from 'next-auth/client'
import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'
import {
  NavItem,
  NavLink,
  Button
} from 'reactstrap'
import {
  Layout,
  Header,
  Footer
} from '../components'
import {
  Authentication,
  LinkupForm
} from '../containers'

export default class extends React.Component {
  static async getInitialProps ({ req, res }) {
    const { csrfToken, user } = await NextAuth.init({ req })
    if (!user) {
      if (res) return res.redirect('/')
      return Router.push('/')
    }
    return {
      csrfToken,
      user
    }
  }

  render () {
    return (
      <Layout>
        <Header>
          { this.props.user.alias &&
            <NavItem>
              <NavLink href={`${this.props.user.alias}`}>
                <FontAwesomeIcon
                  icon='link'
                  className='mr-2 pointer' />
                My link
              </NavLink>
            </NavItem> }
          <Authentication
            csrfToken={this.props.csrfToken}
            user={this.props.user} />
        </Header>
        <LinkupForm
          email={this.props.user.email}
          alias={this.props.user.alias}
          address={this.props.user.address}
          macaroon={this.props.user.macaroon}
          cert={this.props.user.cert}
          csrfToken={this.props.csrfToken} />
        <Footer />
      </Layout>
    )
  }
}
