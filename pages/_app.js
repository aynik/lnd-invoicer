import App, {Container} from 'next/app'
import Head from 'next/head'
import React from 'react'

import { library as fontawesome } from '@fortawesome/fontawesome-svg-core'
import {
  faSignInAlt,
  faSignOutAlt,
  faLink,
  faSave,
  faEdit
} from '@fortawesome/free-solid-svg-icons'

import '@fortawesome/fontawesome-svg-core/styles.css'
import 'bootstrap/dist/css/bootstrap.css'

fontawesome.add(
  faSignInAlt,
  faSignOutAlt,
  faLink,
  faSave,
  faEdit
)

export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }

  render () {
    const {Component, pageProps} = this.props
    return <Container>
      <Head>
	<title>{process.env.APP_DOMAIN}</title>
      </Head>
      <Component {...pageProps} />
    </Container>
  }
}
