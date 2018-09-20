import React from 'react'
import { Link } from 'gatsby'

class NavigationLinks extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Link to={'/projects'}>Projects</Link>
        <Link to={'/blog'}>Blog</Link>
      </div>
    )
  }
}

export default NavigationLinks
