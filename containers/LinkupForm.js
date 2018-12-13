import React from 'react'
import ReactDOM from 'react-dom'
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Dropzone from 'react-dropzone'

const buf2hex = (buffer) => ( 
  Array.prototype.map.call(new Uint8Array(buffer), 
    x => ('00' + x.toString(16)).slice(-2)).join('')
)

const filesToHex = (files, callback) => {
  files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsArrayBuffer = reader.result;
        return callback(file.name, buf2hex(fileAsArrayBuffer))
      }
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.readAsArrayBuffer(file)
  })
}

const fileInputStyle = {
  position: 'relative',
  width: '300px',
  height: '40px',
  textAlign: 'center',
  paddingTop: '8px',
  border: '1px dashed #bfbfbf',
  borderRadius: '5px',
  cursor: 'pointer'
}

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: props.email,
      alias: props.alias,
      address: props.address,
      macaroon: props.macaroon,
      cert: props.cert,
      csrfToken: props.csrfToken,
      macaroonHex: '',
      macaroonInfo: props.macaroon ?
        'Macaroon file already present' :
        'Select or drag invoice.macaroon here',
      certHex: '',
      certInfo: props.cert ?
        'Cert file already present' :
        'Select or drag tls.cert here',
      aliasValid: !!props.alias,
      addressValid: !!props.address
    }
  }

  checkAliasValidity ({ target }) { 
    const { valid } = target.validity
    const { validationMessage } = target
    this.setState({ aliasValid: valid }) 
    if (valid) {
      fetch(`/${target.value}`, {
        method: 'HEAD'
      }).then((res) => {
        if (res.status !== 404 && target.value !== this.state.alias) {
          this.setState({ aliasValid: false }) 
          target.nextSibling.innerHTML = 'Alias was already taken.'
        }
      })
    } else {
      target.nextSibling.innerHTML = validationMessage
    }
  }

  checkAddressValidity ({ target }) {
    const { valid } = target.validity
    const { validationMessage } = target
    this.setState({ addressValid: valid }) 
    if (!valid) {
      target.nextSibling.innerHTML = validationMessage
    }
  }

  onMacaroonChange (files) {
    filesToHex(files, (macaroonFile, macaroonHex) => {
      this.setState({
        macaroonInfo: `Ready to upload ${macaroonFile}`,
        macaroonHex
      })
    })
  }

  onCertChange (files) {
    filesToHex(files, (certFile, certHex) => {
      this.setState({
        macaroonInfo: `Ready to upload ${certFile}`,
        certHex
      })
    })
  }

  render () {
    const {
      email,
      alias,
      address,
      csrfToken,
      cert,
      macaroon
    } = this.props
    const {
      aliasValid,
      addressValid,
      macaroonHex,
      macaroonInfo,
      certHex,
      certInfo
    } = this.state
    return (
      <>
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
              </FormGroup>
              <FormGroup>
                <Label for='alias'>Alias</Label>
                <Input type='text' name='alias' id='alias' 
                  required pattern='[a-zA-Z0-9-_]+'
                  placeholder='my-alias' defaultValue={alias}
                  invalid={!this.state.aliasValid}
                  onBlur={(event) => this.checkAliasValidity(event)} />
                <FormFeedback />
              </FormGroup>
              <FormGroup>
                <Label for='address'>Node address (host:port)</Label>
                <Input type='text' name='address' id='address' 
                  required pattern='[^:]+:[0-9]{1,5}'
                  placeholder='node.provider.tld:9001' defaultValue={address}
                  invalid={!this.state.addressValid}
                  onBlur={(event) => this.checkAddressValidity(event)} />
                <FormFeedback />
              </FormGroup>
              <FormGroup>
                <Label for='macaroon'>
                  { (certHex || cert) &&
                    <span className='text-success'>
                      <FontAwesomeIcon
                        icon='check-circle'
                        className='mr-2' />
                    </span> }
                  Invoice macaroon 
                </Label>
                <Input type='hidden' name='macaroon' id='macaroon' 
                  value={macaroonHex || macaroon} />
                <Dropzone onDrop={(files) => this.onMacaroonChange(files)} multiple={false}
                  style={fileInputStyle}>
                  <p>{macaroonInfo}</p>
                </Dropzone>
                <FormText color='muted'>
                  Required to serve new invoices directly from your
                  node without having to keep your money in our node.
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label for='cert'>
                  { (macaroonHex || macaroon) &&
                    <span className='text-success'>
                      <FontAwesomeIcon
                        icon='check-circle'
                        className='mr-2' />
                    </span> }
                  TLS Certificate 
                </Label>
                <Input type='hidden' name='cert' id='cert' value={certHex || cert} />
                <Dropzone onDrop={(files) => this.onCertChange(files)} multiple={false} 
                  style={fileInputStyle}>
                  <p>{certInfo}</p>
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
      </>
    )
  }
}
