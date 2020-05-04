/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  pathPrefix: `/gatsbyblog`,
  siteMetadata: {
    title: "blog",
    description: "hogehoge",
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blogs",
        path: `${__dirname}/contents/blogs`,
      },
    },
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "fixedPages",
        path: `${__dirname}/contents/fixedPages`,
      },
    },
  ],
}
