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
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blogs",
        path: `${__dirname}/contents/blogs`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "fixedPages",
        path: `${__dirname}/contents/fixedPages`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 590,
            },
          },
        ],
      },
    },
  ]
}
