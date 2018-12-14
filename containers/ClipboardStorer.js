import React from 'react'
import {
  CopyToClipboard
} from 'react-copy-to-clipboard'
import {
  Button
} from 'reactstrap'

export default class extends React.Component {
  state = {
    copied: false
  }

  onCopy = async () => {
    await this.setState({ copied: true })
    setTimeout(() => this.setState({ copied: false }), 2000)
  }

  render () {
    const { children, text } = this.props
    return (
      <CopyToClipboard text={text}
        onCopy={this.onCopy}>
        <Button color={this.state.copied ? 'muted' : 'primary'}> 
          {this.state.copied ? 'Copied!' : children}
        </Button>
      </CopyToClipboard>
    )
  }
}
