import React, { Component } from 'react'
import UrlInput from './UrlInput'
import { connect } from 'react-redux'
import { setUrl, getProgramCard } from './actions'
import { findMedia, findSlug } from './utils'

class App extends Component {
  static get propTypes () {
    return {
      url: React.PropTypes.string,
      program_card: React.PropTypes.object,
      setUrl: React.PropTypes.func,
      onEnterFn: React.PropTypes.func
    }
  }
  render () {
    const uri = findMedia(this.props.program_card)
    const slug = findSlug(this.props.program_card)
    return (
      <div>
        <UrlInput url={this.props.url} setUrl={this.props.setUrl} onEnter={this.props.onEnterFn(this.props.url)} />
        {uri && (
          <textarea readOnly value={`ffmpeg -i "${uri}" -c copy -absf aac_adtstoasc ${slug}.mp4`} />
        )}
      </div>
    )
  }
}

export default connect(
  state => { return { ...state } },
  dispatch => {
    return {
      setUrl: url => {
        dispatch(setUrl(url))
      },
      onEnterFn: url => {
        return _ => {
          dispatch(getProgramCard(url))
        }
      }
    }
  }
)(App)
