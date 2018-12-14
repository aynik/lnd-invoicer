import pkg from '../package.json'
import nextPkg from '../node_modules/next/package.json'
import reactPkg from '../node_modules/react/package.json'
import React from 'react'
import {
  Row,
  Col,
} from 'reactstrap'
import {
  GitHub
} from './'

export default () => (
  <footer className='pt-2 mb-4'>
    <Row className='text-center text-muted'>
      <Col>
        <span>This site is running </span>
        <a href='https://github.com/aynik/lnd-invoicer'>
          <GitHub color={process.env.APP_COLORS_MUTED}
            className='ml-1 mr-1 align-text-bottom' />
          <span>{pkg.name}@{pkg.version}</span>
        </a>
        <span> using </span><span>next@{nextPkg.version}</span>
        <span> and </span><span>react@{reactPkg.version}</span>
      </Col>
    </Row>
  </footer>
)
