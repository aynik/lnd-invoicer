import React from 'react'
import axios from 'axios'
import {
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Form,
  FormGroup,
  Button,
  Input
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CurrencyConverter from '../services/CurrencyConverter'
import ClipboardStorer from '../services/ClipboardStorer'

const capitalize = (str) => str ? str[0].toUpperCase() + str.slice(1) : ''

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.readyStates = Object.freeze({
      IDLE: Symbol('idle'),
      LOADING: Symbol('loading'),
      WAITING: Symbol('waiting')
    })
    this.state = {
      amount: 0,
      payReq: null,
      readyState: this.readyStates.IDLE,
      waitingSecs: 10
    }
  }

  isReadyState (symbol) {
    const { readyState } = this.state
    return readyState === symbol
  }

  async submitRequestInvoice() {
    const { alias } = this.props
    const { amount } = this.state
    const { IDLE, LOADING, WAITING } = this.readyStates
    this.setState({
      readyState: LOADING
    })
    await axios
      .get(`/${alias}/invoice?amount=${amount}`)
      .then((res) => {
	this.setState({
          payReq: res.data
        })
        this.setState({
          readyState: WAITING
        })
        const countDown = () => {
          let { waitingSecs } = this.state
          this.setState({
            waitingSecs: --waitingSecs
          })
          if (waitingSecs) {
            setTimeout(countDown, 1000)
          } else {
            this.setState({
              readyState: IDLE
            })
          }
        }
        countDown()
      })
      .catch(err => {
        console.log('Something went bad', err)
      })
  }

  render () {
    const { alias, onSubmit } = this.props
    const { amount, payReq, waitingSecs } = this.state
    const { IDLE, LOADING, WAITING } = this.readyStates
    return (
      <>
        <Row className='mt-4 mb-4'>
          <Col className='text-center pl-4 pr-4' style={{margin: '0 auto'}}>
            <h1 className='display-5'>{capitalize(alias)}'s payment link</h1>
          </Col>
        </Row>
        <Row className='mb-4'>
          <Col className='text-center' style={{maxWidth: '340px', margin: '0 auto'}}>
            <Card style={{ border: 'none' }}>
              <CardBody>
                <CardTitle>Request an invoice</CardTitle>
                <Form inline className='justify-content-center mb-2'>
                  <CurrencyConverter onChange={
                    (result) => this.setState({ amount: result })
                  } />
                  <FormGroup>
                    <Button className='ml-3'
                      color={this.isReadyState(IDLE) ? 'primary' : 'muted'}
                      onClick={async () => await this.submitRequestInvoice()}>
                      { this.isReadyState(IDLE) ?
                        <>
                          <FontAwesomeIcon
                            icon='qrcode'
                            className='mr-2' />
                          Request
                        </> :
                        <>
                          <FontAwesomeIcon
                            icon='spinner'
                            className='mr-2 spin' />
                          { this.isReadyState(WAITING) ?
                            `Wait (${waitingSecs})` : 'Loading' }
                        </>
                      }
                    </Button>
                  </FormGroup>
                </Form>
              </CardBody>
              { payReq && (
                <>
                  <CardImg top width='100%'
                    src={'https://chart.apis.google.com/chart?cht=qr&chs=200x200&chl=' +
                      `lightning:${payReq}`} alt='Card image cap' />
                  <FormGroup>
                    <Button tag='a' href={`lightning:${payReq}`}
                      color='primary' className='mr-4'>
                        Pay with wallet
                    </Button>
                    <ClipboardStorer text={payReq}>
                      Copy to clipboard
                    </ClipboardStorer>
                  </FormGroup>
                </>
              )}
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}
