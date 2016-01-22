import React, { Component } from 'react'
import { findMedia, findSlug, findProgramName } from './utils'

export default class Command extends Component {
  static get propTypes () {
    return {
      programCard: React.PropTypes.object
    }
  }
  render () {
    const { programCard } = this.props

    if (!programCard) {
      return <textarea readOnly value={''} rows={9} />
    }

    const uri = findMedia(programCard)

    if (!uri) {
      return <p><strong>No asset available.</strong></p>
    }

    const slug = findSlug(programCard)
    const fileName = findProgramName(programCard) || slug

    return (
      <textarea readOnly value={`ffmpeg -i "${uri}" -c copy -absf aac_adtstoasc "${fileName}.mp4"`} rows={9} />
    )
  }
}

