import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import styles from "../styles/tags.module.css"

export default ({
  data: {
    allMarkdownRemark: { totalCount, edges: blogs }
  },
}) => {
  return (
    <Layout>
      {blogs.map(
        ({
          node: {
            id,
            html,
            frontmatter: { title, date },
            fields: { slug },
          },
        }) => (
          <div key={id}>
            <hr className={styles.tagsHr} />
            <h2 className={styles.tagsTitle}><Link to={slug} className={styles.tagsLink}>{title}</Link></h2>
            <p className={styles.tagsDate}>{date}</p>
            <div dangerouslySetInnerHTML={{__html: html}} />
          </div>
        )
      )}
    </Layout>
  )
}

export const pageQuery = graphql`
  query($tag: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          html
          frontmatter {
            title
            date(formatString: "YYYY年MM月DD日")
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
