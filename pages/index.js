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
  Jumbotron,
  Instructions,
  Footer
} from '../components'
import {
  Authentication,
} from '../containers'

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
                  <NavLink href={`/${this.props.user.alias}`}>
                    <FontAwesomeIcon
                      icon='link'
                      className='mr-2 pointer' />
                    My link
                  </NavLink>
                </NavItem> :
                <NavItem>
                  <NavLink href="/link-up">
                    <FontAwesomeIcon
                      icon='edit'
                      className='mr-2 pointer' />
                    Link up!
                  </NavLink>
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
