const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const projectTemplate = path.resolve('./src/templates/project.js')
    resolve(
      Promise.all([
        graphql(
          `
            {
              allMarkdownRemark(
                sort: { fields: [frontmatter___date], order: DESC }
                limit: 1000
                filter: { fields: { slug: { glob: "**/blog/**" } } }
              ) {
                edges {
                  node {
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                    }
                  }
                }
              }
            }
          `
        ),
        graphql(
          `
            {
              allMarkdownRemark(
                sort: { fields: [frontmatter___date], order: DESC }
                limit: 1000
                filter: { fields: { slug: { glob: "**/projects/**" } } }
              ) {
                edges {
                  node {
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                    }
                  }
                }
              }
            }
          `
        ),
      ]).then(result => {
        console.log(result)
        const [blogs, projects] = result
        if (blogs.errors) {
          console.log(blogs.errors)
          reject(blogs.errors)
        }

        // Create blog posts pages.
        console.log('Posts')
        const posts = blogs.data.allMarkdownRemark.edges

        _.each(posts, (post, index) => {
          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node
          const next = index === 0 ? null : posts[index - 1].node

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })

        // Create a project page
        console.log('Projects')
        const projectPages = projects.data.allMarkdownRemark.edges

        _.each(projectPages, (project, index) => {
          const previous =
            index === projectPages.length - 1
              ? null
              : projectPages[index + 1].node
          const next = index === 0 ? null : projectPages[index - 1].node

          createPage({
            path: project.node.fields.slug,
            component: projectTemplate,
            context: {
              slug: project.node.fields.slug,
              previous,
              next,
            },
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
