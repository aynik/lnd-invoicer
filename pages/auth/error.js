import React from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default class extends React.Component {
  static async getInitialProps({query}) {
    return {
      action: query.action || null,
      type: query.type || null,
      service: query.service || null
    }
  }

  render() {
    if (this.props.action == 'signin' && this.props.type == 'token-invalid') {
      return (
        <Layout>
          <Header />
          <div className='text-center'>
            <h1 className='display-4 mt-5 mb-2'>Link not valid</h1>
            <p className='lead'>This sign in link is no longer valid.</p>
            <p className='lead'><Link href='/'><a>Get a new sign in link</a></Link></p>
          </div>
          <Footer />
        </Layout>
      )
    } else {
      return (
        <Layout>
          <Header />
          <div className='text-center'>
            <h1 className='display-4 mt-5'>Error signing in</h1>
            <p className='lead'>An error occured while trying to sign in.</p>
            <p className='lead'><Link href='/'><a>Try again</a></Link></p>
          </div>
          <Footer />
        </Layout>
      )
    }
  }
}
