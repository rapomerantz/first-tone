import React, { Component } from 'react'

export default class BasicSynthButton extends Component {
  render() {
      let buttonArgument = this.props.buttonArgument
      let buttonText = this.props.buttonText
    return (
        <button onClick={this.props.buttonFunction(buttonArgument)}>{buttonText}</button>
    )
  }
}
