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
        <ol>
          <li><code>$ brew install ffmpeg</code></li>
          <li>Go to some show on <a href='http://dr.dk/tv'>DR TV</a></li>
          <li>
            Click this bookmarklet:&nbsp;
            <a href={bookmarklet('https://dldr.brnbw.com')} className='bookmarklet'>DLDR</a>
            <ul>
              <li>
                Or paste url into this box and press return
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
        <p>
        </p>
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
