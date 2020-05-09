import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import styles from "../styles/index.module.css"

export default ({
  data: {
    allMarkdownRemark: { totalCount, edges: blogs },
  }
}) => (
  <Layout page={"top"}>
    {blogs.map(
      ({
        node: {
          id,
          frontmatter: {title, date},
          fields: {slug},
          excerpt,
        },
      }) => (
        <div key={id} className={styles.indexBox}>
          <h2 className={styles.indexTitle}><Link to={slug} className={styles.indexLink}>{title}</Link></h2>
          <p className={styles.indexDate}>{date}</p>
          <p>{excerpt}</p>
        </div>
      )
    )}
  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { sourceName: { eq: "blogs" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ){
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY年MM月DD日")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
