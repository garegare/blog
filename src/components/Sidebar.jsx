import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import styles from "../styles/sidebar.module.css"

export default () => {
  const {
    recentlyAllMarkdownRemark: { edges: recentlyBlogs },
    tagsAllMarkdownRemark: { group: tags },
    fixedPagesAllMarkdownRemark: { edges: fixedPages },
  } = useStaticQuery(
    graphql`
      query{
        recentlyAllMarkdownRemark: allMarkdownRemark(
          filter: { fields: { sourceName: { eq: "blogs" } } }
          sort: { fields: [ frontmatter___date ], order: DESC }
          limit: 5
        ) {
          edges {
            node {
              id
              frontmatter {
                title
              }
              fields {
                slug
              }
            }
          }
        }
        tagsAllMarkdownRemark: allMarkdownRemark {
          group(field: frontmatter___tags) {
            tag: fieldValue
            totalCount
          }
        }
        fixedPagesAllMarkdownRemark: allMarkdownRemark(
          filter: { fields: { sourceName: { eq: "fixedPages" } } }
          sort: { fields: [ frontmatter___date ], order: DESC }
        ) {
          edges {
            node {
              id
              frontmatter {
                title
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )
  return (
    <>
      <div>
        <div className={styles.twitterLogo} />
        <hr className={styles.sidebarHr} />
        <h3 className={styles.sidebarTopic}>このページについて</h3>
        <ul className={styles.sidebarUl}>
          {fixedPages.map(
            ({
              node: {
                id,
                frontmatter: {title},
                fields: {slug},
              },
            }) => (
              <li key={id}><Link to={slug}>{title}</Link></li>
            )
          )}
        </ul>
      </div>

      <div>
        <h3 className={styles.sidebarTopic}>最近の投稿</h3>
        <ul className={styles.sidebarUl}>
          {recentlyBlogs.map(
            ({
              node: {
                id,
                frontmatter: {title},
                fields: {slug},
              },
            }) => (
              <li key={id}><Link to={slug}>{title}</Link></li>
            )
          )}
        </ul>
      </div>

      <div>
        <h3 className={styles.sidebarTopic}>タグ別記事</h3>
        <ul className={styles.sidebarUl}>
          {tags.map(({ tag, totalCount }) => (
            <li key={tag}><Link to={`tag/${tag}`}>{tag}</Link>({totalCount})</li>
          ))}
        </ul>
      </div>
    </>
  )
}
