const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    //const value = createFilePath({ node, getNode, basePath: "pages" })

    // Create Field for Slug
    createNodeField({
      name: "slug",
      node,
      value: createFilePath({ node, getNode, basePath: "pages" }),
    })

    // Create Field for InstanceName by name option of gatsby-source-filesystem
    createNodeField({
      name: "sourceName",
      node,
      value: getNode(node.parent).sourceInstanceName,
    })
  }
}

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions
  const result = await graphql(`
    query {
      blogMarkdownRemark: allMarkdownRemark(
        filter: {fields: {sourceName: {eq: "blogs"}}}
      ){
        edges {
          node {
            fields {
              sourceName
              slug
            }
          }
        }
      }
      tagsAllMarkdownRemark: allMarkdownRemark {
        group(field: frontmatter___tags) {
          tag: fieldValue
        }
      }
      fixedMarkdownRemark: allMarkdownRemark(
        filter: {fields: {sourceName: {eq: "fixedPages"}}}
      ){
        edges {
          node {
            fields {
              sourceName
              slug
            }
          }
        }
      }
    } 
  `)

  result.data.blogMarkdownRemark.edges.forEach(({node}) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve("./src/templates/blog-post.jsx"),
      context: {
          slug: node.fields.slug,
      },
    })
  })
  result.data.tagsAllMarkdownRemark.group.forEach(({tag}) => {
    createPage({
      path: `/tag/${tag}/`,
      component: path.resolve("./src/templates/tags.jsx"),
      context: {
        tag,
      },
    })
  })
  result.data.fixedMarkdownRemark.edges.forEach(({node}) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve("./src/templates/fixed-page.jsx"),
      context: {
          slug: node.fields.slug,
      },
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      title: String!
      tags: [String!]!
    }
  `
  createTypes(typeDefs)
}
