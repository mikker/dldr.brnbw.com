import React from 'react'

export default class UrlInput extends React.Component {
  static get propTypes () {
    return {
      url: React.PropTypes.string,
      setUrl: React.PropTypes.func,
      onEnter: React.PropTypes.func
    }
  }
  render () {
    const onChange = event => {
      this.props.setUrl(event.currentTarget.value)
    }
    const onKeyUp = event => {
      if (event.keyCode === 13) {
        this.props.onEnter()
      }
    }
    return (
      <input type='text' placeholder='url' value={this.props.url} onChange={onChange} onKeyUp={onKeyUp} />
    )
  }
}

