import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import styles from "../styles/blog-post.module.css"


export default ({
  data: {
    markdownRemark: {
      html,
      frontmatter: { title, date, tags },
    },
  },
}) => {
  return (
    <Layout>
      <h2 className={styles.blogPostTitle}>{title}</h2>
      <p className={styles.blogPostDate}>{date}</p>
      <ul className={styles.blogPostTags}>
        {tags.map((tag) => (<li className={styles.blogPostTag}>{tag}</li>))}
      </ul>
      <div dangerouslySetInnerHTML={{__html: html}} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: {slug: { eq: $slug }}) {
      html
      frontmatter {
        title
        date(formatString: "YYYY年MM月DD日")
        tags
      }
    }
  }
`
