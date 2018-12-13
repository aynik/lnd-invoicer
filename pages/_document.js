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
            .jumbotron {
              background-color: #fff;
            }
            .mark, mark {
              background-color: ${process.env.APP_COLORS_MARK};
            }
            @-moz-keyframes spin {
	      from { -moz-transform: rotate(0deg); }
	      to { -moz-transform: rotate(360deg); }
            }
            @-webkit-keyframes spin {
	      from { -webkit-transform: rotate(0deg); }
	      to { -webkit-transform: rotate(360deg); }
            }
            @keyframes spin {
	      from {transform:rotate(0deg);}
	      to {transform:rotate(360deg);}
            }
            .spin {
	      -webkit-animation-name: spin;
	      -webkit-animation-duration: 2000ms;
	      -webkit-animation-iteration-count: infinite;
	      -webkit-animation-timing-function: linear;
	      -moz-animation-name: spin;
	      -moz-animation-duration: 2000ms;
	      -moz-animation-iteration-count: infinite;
	      -moz-animation-timing-function: linear;
	      -ms-animation-name: spin;
	      -ms-animation-duration: 2000ms;
	      -ms-animation-iteration-count: infinite;
	      -ms-animation-timing-function: linear;
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
