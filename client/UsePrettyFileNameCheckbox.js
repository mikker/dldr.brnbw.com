import React from 'react'
import { connect } from 'react-redux'
import { setUsePrettyFileName, getProgramCard } from './actions'

class UsePrettyFileNameCheckbox extends React.Component {

  static get propTypes () {
    return {
      setOn: React.PropTypes.func,
    }
  }

  render () {
    const onChange = event => {
      const isOn = event.currentTarget.checked
      this.props.setOn(isOn)
    }
    return (
        <input type='checkbox' onChange={onChange} />
    )
  }
}

export default connect(state => {
  return { ...state }
}, dispatch => {
  return {
    setOn: isOn => {
      dispatch(setUsePrettyFileName(isOn))
    }
  }
})(UsePrettyFileNameCheckbox)

