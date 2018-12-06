import React, { Component } from 'react'
import axios from 'axios'
import { FormGroup, Label, InputGroup, InputGroupAddon, Input } from 'reactstrap'

class Converter extends Component {
  state = {
    result: null,
    fromCurrency: 'USD',
    amount: 5,
    ticker: { USD: { '15m': 0, symbol: '$' }},
    currencies: ['USD']
  }

  componentDidMount() {
    axios
      .get('https://blockchain.info/ticker')
      .then((res) => {
	this.setState({
          ticker: { BTC: { '15m': 1, symbol: '₿' }, ...res.data },
          currencies: ['BTC'].concat(Object.keys(res.data))
        }, () => this.updateResult())
      })
      .catch(err => {
	console.log('Ticker fetch failed', err);
      })
  }

  updateResult() {
    const rate = this.state.ticker[this.state.fromCurrency]['15m']
    const result = parseInt((parseFloat(this.state.amount) / rate) * 1e8, 10) || 0
    this.setState({ result }, () => {
      if (this.props.onChange) this.props.onChange(result)
    })
  }

  onCurrencyChange(event) {
    const fromCurrency = event.target.value
    this.setState({
      fromCurrency
    }, () => this.updateResult())
  }

  onAmountChange(event) {
    this.setState({
      amount: event.target.value
    }, () => this.updateResult())
  }

  render() {
    return (
      <React.Fragment>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              {this.state.ticker[this.state.fromCurrency].symbol}
            </InputGroupAddon>
            <Input type='text' name='amount' size='6'
              placeholder='0'
              value={this.state.amount}
              onChange={(event) => this.onAmountChange(event)} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Input type='select' name='from'
            onChange={(event) => this.onCurrencyChange(event)}
            value={this.state.fromCurrency}>
            {this.state.currencies.map((cur) => (
              <option key={cur}>{cur}</option>
            ))}
          </Input>
        </FormGroup>
      </React.Fragment>
    )
  }
}

export default Converter
