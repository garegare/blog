/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const config = require("./privateData.json");

module.exports = {
  pathPrefix: `/blog`,
  siteMetadata: {
    title: "yakiniku-teishoku",
    description: "日々の備忘録など",
    twitter: config.twitter,
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
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: config.googleAnalyticsID
      },
    },
  ]
}
