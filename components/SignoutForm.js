import React from 'react'
import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'
import {
  Button,
  Input
} from 'reactstrap'

export default ({ csrfToken, onSubmit }) => (
  <form method='post' action='/auth/signout' onSubmit={onSubmit}>
    <Input name="_csrf" type="hidden" value={csrfToken}/>
    <Button color='primary' type='submit'>
      <FontAwesomeIcon
        icon='sign-out-alt'
        className='mr-2 pointer' />
      Sign out
    </Button>
  </form>
)
