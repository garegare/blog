import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import styles from "../styles/fixed-page.module.css"


export default ({
  data: {
    markdownRemark: {
      html,
      frontmatter: { title, date },
    },
  },
}) => {
  return (
    <Layout>
      <h2 className={styles.fixedPageTitle}>{title}</h2>
      <p className={styles.fixedPageDate}>{date}</p>
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
      }
    }
  }
`
