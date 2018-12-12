import React from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText
} from 'reactstrap'

export default () => (
  <section>
    <Row className='mb-4'>
      <Col>
        <Card className='d-flex flex-row'>
          <CardBody className='ml-2 col col-auto'>
            <CardTitle className='display-5 text-primary'>1.</CardTitle>
          </CardBody>
          <CardBody className='pl-0 col col-11'>
            <CardTitle className='display-6'>Sign up using your email.</CardTitle>
            <CardSubtitle>
              It will be used to create your profile and to authenticate you in the future.
            </CardSubtitle>
          </CardBody>
        </Card>
      </Col>
    </Row>
    <Row className='mb-4'>
      <Col>
        <Card className='d-flex flex-row'>
          <CardBody className='ml-2 col col-auto'>
            <CardTitle className='display-5 text-primary'>2.</CardTitle>
          </CardBody>
          <CardBody className='pl-0 col col-11'>
            <CardTitle className='display-6'>Configure your payment link.</CardTitle>
            <CardSubtitle>Pick up an alias and commit your <span className='font-weight-bold'>node address</span> together with your node's <span className='font-weight-bold'>invoice.macaroon</span> and <span className='font-weight-bold'>tls.cert</span>.</CardSubtitle>
          </CardBody>
        </Card>
      </Col>
    </Row>
    <Row className='mb-4'>
      <Col>
        <Card className='d-flex flex-row'>
          <CardBody className='ml-2 col col-auto'>
            <CardTitle className='display-5 text-primary'>3.</CardTitle>
          </CardBody>
          <CardBody className='pl-0 col col-11'>
            <CardTitle className='display-6'>Share it with the world.</CardTitle>
            <CardSubtitle>Share your payment link so anybody can send you payments over lightning network whithout having to create invoices yourself!</CardSubtitle>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </section>
)
