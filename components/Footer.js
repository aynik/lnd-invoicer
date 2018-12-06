import pkg from '../package.json'
import nextPkg from '../node_modules/next/package.json'
import reactPkg from '../node_modules/react/package.json'
import React from 'react'
import {
  Row,
  Col,
} from 'reactstrap'
import GitHub from './GitHub'

export default () => (
  <footer className='pt-2 mb-4'>
    <Row className='text-center text-muted'>
      <Col>
        <span>This site is running </span>
        <a href='https://github.com/aynik/lnd-invoicer'>
          <GitHub color={process.env.APP_COLORS_MUTED} className='mr-2 align-text-top' />
          <span className='font-weight-bold'>{pkg.name}@{pkg.version}</span>
        </a>
        <span> using </span><span className='font-weight-bold'>next@{nextPkg.version}</span>
        <span> and </span><span className='font-weight-bold'>react@{reactPkg.version}</span>
      </Col>
    </Row>
  </footer>
)
