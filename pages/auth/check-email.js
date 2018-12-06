import React from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default class extends React.Component {
  static async getInitialProps({query}) {
    return {
      email: query.email
    }
  }

  render() {
    return (
      <Layout>
        <Header />
        <div className='text-center'>
          <h1 className='display-4 mt-5 mb-3'>Check your email</h1>
          <p className='lead'>
            A sign in link has been sent to { (this.props.email) ? <span className='font-weight-bold'>{this.props.email}</span> : <span>your inbox</span> }.
          </p>
          <p>
            <Link href='/'><a>Home</a></Link>
          </p>
        </div>
        <Footer />
      </Layout>
    )
  }
}
