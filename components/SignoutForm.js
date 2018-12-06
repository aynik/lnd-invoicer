import React from 'react'
import { Button, Input } from 'reactstrap'

export default ({ csrfToken, onSubmit }) => (
  <form method='post' action='/auth/signout' onSubmit={onSubmit}>
    <Input name="_csrf" type="hidden" value={csrfToken}/>
    <Button color='primary' type='submit'>Sign out</Button>
  </form>
)
