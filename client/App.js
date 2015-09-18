import React, { Component, PropTypes } from 'react'
import UrlInput from './UrlInput'
import Command from './Command'
import { connect } from 'react-redux'
import bookmarklet from './bookmarklet'

require('./App.scss')

class App extends Component {

  static get propTypes () {
    return {
      programCard: PropTypes.object,
      slug: PropTypes.string
    }
  }

  render () {
    return (
      <div id='App'>
      <h3>Steps</h3>
        <ol>
          <li><code>$ brew install ffmpeg</code> or <a href='http://ffmpeg.org/download.html'>download an installer</a></li>
          <li>Go to some show on <a href='http://dr.dk/tv'>DR TV</a></li>
          <li>
            Click this bookmarklet:&nbsp;
            <a href={bookmarklet('https://dldr.brnbw.com')} className='bookmarklet'>DLDR</a>
            <ul>
              <li>
                Or paste the URL into this box and press return:
                <UrlInput />
                <small>Slug: <strong>{this.props.slug}</strong></small>
              </li>
            </ul>
          </li>
          <li>
            Run this command in your terminal:
            <Command programCard={this.props.programCard} />
          </li>
        </ol>
        <h3>Explanation</h3>
        <ul>
          <li>DR streams shows to non-Flash-player clients by supplying a playlist (<code>.m3u8</code>) of very small bits of video (<code>.ts</code>).</li>
          <li><code>.ts</code> is just H.264 encoded <code>.mp4</code> video that's missing some header information.</li>
          <li>These stream URLs are <a href='http://dr.dk/mu'>available through DR's own API</a>.</li>
          <li>We can use <code>ffmpeg</code> to grab all the video bits, concattenate them together and add in that missing and optional header information and then renaming to <code>.mp4</code>.</li>
          <li><strong>It's kind of like if your VCR could record in Fast-Forward mode.</strong></li>
          <li>Now go grab some of your <a href='http://dr.dk/bagedyst'>favourite shows</a> and watch them on a plane or whatever.</li>
        </ul>
        <h3>Source</h3>
        <p>This tool is <a href='http://github.com/mikker/dldr.brnbw.com'>open source</a>.</p>
      </div>
    )
  }

}

export default connect(state => {
  return {
    programCard: state.programCard,
    slug: state.slug
  }
})(App)
