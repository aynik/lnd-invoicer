import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Dropzone from 'react-dropzone'
import AliasChecker from '../controllers/AliasChecker'

const buf2hex = (buffer) => ( 
  Array.prototype.map.call(new Uint8Array(buffer), 
    x => ('00' + x.toString(16)).slice(-2)).join('')
)

const fileToHex = (handler) => ( 
  (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const fileAsArrayBuffer = reader.result;
          return handler(buf2hex(fileAsArrayBuffer))
        }
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.readAsArrayBuffer(file)
    })
  }
)

const fileInputStyle = {
  position: 'relative',
  height: '40px',
  width: '105px',
  opacity: 1,
  color: '#fff'
}

const fileLabelStyle = {
  position: 'absolute',
  zIndex: 1,
  marginLeft: '115px',
  minWidth: '150px',
  lineHeight: '26px',
  color: '#000'
}

const withFileState = compose(
  withState('macaroonHex', 'setMacaroon', ''),
  withState('certHex', 'setCert', ''),
  withHandlers({
    onMacaroonChange: ({ setMacaroon }) => fileToHex(setMacaroon),
    onCertChange: ({ setCert }) => fileToHex(setCert)
  })
)

export default withFileState(({ 
  email,
  alias,
  address,
  macaroon,
  cert,
  csrfToken,
  macaroonHex,
  certHex,
  onMacaroonChange,
  onCertChange
}) => (
  <React.Fragment>
    <Row className='mt-4 mb-4'>
      <Col className='col-xl-8 offset-xl-2 col-10 offset-1'>
        <h1 className='display-5'>Configure your payment link</h1>
      </Col>
    </Row>
    <Row className='mb-4'>
      <Col className='col-xl-8 offset-xl-2 col-10 offset-1'>
        <Form method='post' action='/link-up'>
          <FormGroup>
            <Input name="_csrf" type="hidden" value={csrfToken}/>
            <Label for='email'>Email</Label>
            <p className='text-primary'>{email}</p>
            <Label for='alias'>Alias</Label>
            <AliasChecker ownAlias={alias}>
              <Input type='text' name='alias' id='alias' 
                placeholder='my-payment-alias' defaultValue={alias} />
            </AliasChecker>
            <br />
            <Label for='address'>Node address (host:port)</Label>
            <Input type='text' name='address' id='address' pattern='[^\:]+:[0-9]{1,5}'
              placeholder='node.provider.tld:9001' defaultValue={address} />
            <br />
            <Label for='macaroon'>invoice.macaroon</Label>
            <Input type='hidden' name='macaroon' id='macaroon' 
              value={macaroonHex || macaroon} />
            <p style={{...fileLabelStyle, color: cert ? '#28a745' : '#000'}}>{
              macaroonHex || macaroon ? 'Macaroon loaded' : 'No file chosen' 
            }</p>
            <Dropzone onDrop={onMacaroonChange} multiple={false}
              style={fileInputStyle}
              inputProps={{style: fileInputStyle }}>
            </Dropzone>
            <FormText color='muted'>
              Required to serve new invoices directly from your
              node without having to keep your money in our node.
            </FormText>
            <br />
            <Label for='cert'>tls.cert</Label>
            <Input type='hidden' name='cert' id='cert' value={certHex || cert} />
            <Dropzone onDrop={onCertChange} multiple={false} 
              style={fileInputStyle}
              inputProps={{style: fileInputStyle }}>
                <p style={{...fileLabelStyle, color: cert ? '#28a745' : '#000'}}>{
                  certHex || cert ? 'Cert loaded' : 'No file chosen' 
                }</p>
            </Dropzone>
            <FormText color='muted'>
              Required to connect to your node securely and prevent
              middlemen from sniffing information.
            </FormText>
          </FormGroup>
          <br />
          <Button color='primary' type='submit'>
            <FontAwesomeIcon
              icon='save'
              className='mr-2 pointer' />
            Save
          </Button>
        </Form>
      </Col>
    </Row>
  </React.Fragment>
))
