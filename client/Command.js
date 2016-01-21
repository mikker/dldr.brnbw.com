import React, { Component } from 'react'
import { findMedia, findSlug, findProgramName } from './utils'

export default class Command extends Component {
  static get propTypes () {
    return {
      programCard: React.PropTypes.object,
      usePrettyFileName: React.PropTypes.bool
    }
  }
  render () {
    if (!this.props.programCard) {
      return <textarea readOnly value={''} rows={9} />
    }

    const uri = findMedia(this.props.programCard)
    const slug = findSlug(this.props.programCard)
    const programName = findProgramName(this.props.programCard)
    const fileName = this.props.usePrettyFileName ? programName : slug  
      
    return (
      <textarea readOnly value={`ffmpeg -i "${uri}" -c copy -absf aac_adtstoasc "${fileName}.mp4"`} rows={9} />
    )
  }
}

