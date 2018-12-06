import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render() {
    return (
      <html>
        <meta name='viewport' content='user-scalable=no, width=device-width' />
        <Head>
          <link rel='icon' type='image/x-icon' href='/static/favicon.ico' />
          <link 
            href='https://fonts.googleapis.com/css?family=Montserrat|Open+Sans'
            rel='stylesheet' />
          <link 
            rel='stylesheet'
            href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
            integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm'
            crossOrigin='anonymous' />
          <style>{`
            * {
              font-family: Open Sans, sans-serif;
              font-size: 14px;
            } 
            h1, h2, h3, h4, h5, h6, h7, h8 {
              font-family: Montserrat, sans-serif;
              line-height: 1.8;
            }
            a, a:hover,
            .navbar-brand, .nav-link,
            .navbar-brand:hover, .nav-link:hover {
              text-decoration: none;
              color: ${process.env.APP_COLORS_PRIMARY};
            }
            .text-primary {
              color: ${process.env.APP_COLORS_PRIMARY}!important;
            }
            .text-muted a,
            .text-muted a:hover {
              color: ${process.env.APP_COLORS_MUTED};
            }
            .btn-primary,
            .btn-primary:hover {
              background-color: ${process.env.APP_COLORS_PRIMARY};
              border-color: ${process.env.APP_COLORS_PRIMARY};
            }
            .display-5 {
              font-size: 2.5rem;
              font-weight: 300;
              line-height: 1.2;
            }
            .display-6 {
              font-size: 1.5rem;
              font-weight: 300;
              line-height: 1.2;
            }
            .jumbotron,
            .mark, mark {
              background-color: ${process.env.APP_COLORS_MARK};
            }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
