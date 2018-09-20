import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Bio from '../components/Bio'
import githubLogo from '../assets/github.png'
import Layout from '../components/layout'
import { rhythm } from '../utils/typography'
import NavigationLinks from '../components/NavigationLinks'

class ProjectTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const siteDescription = post.excerpt
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${post.frontmatter.title} | ${siteTitle}`}
        />
        <h1>
          {post.frontmatter.title}{' '}
          <a
            href={post.frontmatter.source}
            target="_blank"
            style={{ boxShadow: 'none' }}
          >
            <img src={githubLogo} style={{ marginBottom: 0 }} />
          </a>
        </h1>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />
        <NavigationLinks />
      </Layout>
    )
  }
}

export default ProjectTemplate

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        source
      }
    }
  }
`
