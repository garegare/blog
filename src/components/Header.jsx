import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import styles from "../styles/header.module.css"

export default ({ page }) => {
  const {
    site: {
      siteMetadata: { title, description},
    }
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }`
  )

  return (
    <header>
      <div className={styles.headerBox}>
        <h1>
          <Link to="/" className={styles.headerLink}>{title}</Link>
        </h1>
        <p>{description}</p>
      </div>
    </header>
  )
}


