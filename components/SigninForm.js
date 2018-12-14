import React from 'react'
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap'

export default ({ csrfToken, onSubmit }) => (
  <Row className='mb-4'>
    <Col>
      <Form method='post' action='/auth/email/signin' onSubmit={onSubmit}>
        <FormGroup>
          <Input name="_csrf" type="hidden" value={csrfToken}/>
          <Label for='email'>Email</Label>
          <Input type='email' name='email' id='email' placeholder='user@provider.tld' />
        </FormGroup>
        <Button color='primary' type='submit'>Sign in</Button>
      </Form>
    </Col>
  </Row>
)
