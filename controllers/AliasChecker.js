import React from 'react'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      aliasAvailable: null,
      ownAlias: props.ownAlias,
      children: React.Children.map(this.props.children, (child) => (
        React.cloneElement(child, {
          onChange: (event) => this.onChildChange(event)
        })
      ))
    }
  }

  onChildChange (event) {
    event.persist()
    const alias = event.target.value
    fetch(`/${alias}`, {
      method: 'HEAD'
    }).then((res) => {
      const { classList } = event.target
      if (res.status !== 404 &&
        this.state.ownAlias !== alias) {
        classList.remove('is-valid')
        classList.add('is-invalid')
      } else {
        classList.remove('is-invalid')
        classList.add('is-valid')
      }
    })
  }

  render () {
    return (
      <React.Fragment>
        {this.state.children}
      </React.Fragment>
    )
  }
}
