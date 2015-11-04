import React, { Component } from 'react'
import { findMedia, findSlug } from './utils'

export default class Command extends Component {
  static get propTypes () {
    return {
      programCard: React.PropTypes.object
    }
  }
  render () {
    if (!this.props.programCard) {
      return <textarea readOnly value={''} rows={9} />
    }

    const slug = findSlug(this.props.programCard)
    const uri = findMedia(this.props.programCard)

    if (!uri) {
      return <p><strong>No asset available.</strong></p>
    }

    return (
      <textarea readOnly value={`ffmpeg -i "${uri}" -c copy -absf aac_adtstoasc ${slug}.mp4`} rows={9} />
    )
  }
}

