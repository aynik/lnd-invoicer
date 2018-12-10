import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
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
import CurrencyConverter from '../services/CurrencyConverter'
import ClipboardStorer from '../services/ClipboardStorer'

const capitalize = (str) => str ? str[0].toUpperCase() + str.slice(1) : ''

const withAmountState = compose(
  withState('amount', 'setAmount', 0),
  withState('requested', 'setRequested', false)
)

export default withAmountState(({
  alias,
  payReq,
  amount,
  setAmount,
  requested,
  setRequested,
  onSubmit
}) => (
  <React.Fragment>
    <Row className='mt-4 mb-4'>
      <Col className='text-center pl-4 pr-4' style={{margin: '0 auto'}}>
        <h1 className='display-5'>{capitalize(alias)}'s payment link</h1>
      </Col>
    </Row>
    <Row className='mb-4'>
      <Col className='text-center' style={{maxWidth: '340px', margin: '0 auto'}}>
        <Card>
          <CardBody>
            <CardTitle>Request an invoice</CardTitle>
            <Form inline className='justify-content-center mb-2'>
              <CurrencyConverter onChange={(result) => setAmount(result)} />
              <FormGroup>
                <Button color='primary' className='ml-3'
                  onClick={async () => {
                    await onSubmit(amount)
                    setRequested(true)
                  }}>
                    Request
                </Button>
              </FormGroup>
            </Form>
          </CardBody>
          { amount > 0 && (
            <p>{amount} SAT</p>
          )}
          { requested && (
            <React.Fragment>
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
            </React.Fragment>
          )}
        </Card>
      </Col>
    </Row>
  </React.Fragment>
))
