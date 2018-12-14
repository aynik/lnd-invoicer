import React from 'react'
import {
  Row,
  Col,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Button
} from 'reactstrap'
import {
  Logo
} from './'

export default ({ children }) => (
  <Row>
    <Col>
      <Navbar expand='xs'>
	<NavbarBrand href='/'> 
          <Logo />
          {process.env.APP_DOMAIN}
        </NavbarBrand>
        <Nav className='ml-auto' navbar>
          {children} 
        </Nav>
      </Navbar> 
    </Col>
  </Row>
)
