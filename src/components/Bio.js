import React from 'react'
import { Link } from 'gatsby'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from '../assets/headshot.png'
import githubLogo from '../assets/github.png'
import twitterLogo from '../assets/Twitter_Logo_Blue.png'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
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
        <div>
          <p>
            Collection of blog posts and rambilings of{' '}
            <strong>Alex Dobin</strong>. Living in Washington, working at
            Microsoft.{' '}
            <a
              href="https://github.com/adobin"
              target="_blank"
              style={{
                boxShadow: 'none',
                marginRight: rhythm(1 / 2),
                marginLeft: rhythm(1 / 2),
              }}
            >
              <img
                src={githubLogo}
                alt={'Github'}
                style={{
                  width: rhythm(2 / 3),
                  height: rhythm(2 / 3),
                }}
              />
            </a>
            <a
              href="https://twitter.com/alexdobin"
              target="_blank"
              style={{ boxShadow: 'none' }}
            >
              <img
                src={twitterLogo}
                alt={'Twitter'}
                style={{
                  width: rhythm(2 / 3),
                  height: rhythm(2 / 3),
                }}
              />
            </a>
          </p>
        </div>
      </div>
    )
  }
}

export default Bio
