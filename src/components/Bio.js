import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from '../assets/headshot.png'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Alex Dobin`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <p>
          Collection of blog posts and rambilings of <strong>Alex Dobin</strong>
          . Living in Washington, working at Microsoft.
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <a href="https://github.com/adobin" target="_blank">
              Github
            </a>
            <a href="https://twitter.com/alexdobin" target="_blank">
              Twitter
            </a>
          </div>
        </p>
      </div>
    )
  }
}

export default Bio
