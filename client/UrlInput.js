import React from 'react'
import { connect } from 'react-redux'
import { setUrl, getProgramCard } from './actions'

class UrlInput extends React.Component {

  static get propTypes () {
    return {
      url: React.PropTypes.string,
      setUrl: React.PropTypes.func,
      onEnter: React.PropTypes.func
    }
  }

  render () {
    const onChange = event => {
      const url = event.currentTarget.value
      this.props.setUrl(url)
    }
    const onKeyUp = event => {
      if (event.keyCode === 13) {
        this.props.onEnter()
      }
    }
    return (
      <div>
        <input type='text' placeholder='url' value={this.props.url} onChange={onChange} onKeyUp={onKeyUp} />
      </div>
    )
  }
}

export default connect(state => {
  return { ...state }
}, dispatch => {
  return {
    setUrl: url => {
      dispatch(setUrl(url))
    },
    onEnter: _ => {
      dispatch(getProgramCard())
    }
  }
})(UrlInput)

