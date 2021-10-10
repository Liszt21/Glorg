module.exports = {
  siteMetadata: {
    siteUrl: "https://glorg.liszt.space",
    title: "Glorg"
  },
  plugins: [
    {
      resolve: "gatsby-plugin-less",
      options: { lessOptions: { javascriptEnabled: true } }
    },
    "gatsby-plugin-emotion",
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-react-helmet",
    // "gatsby-plugin-antd",
    { resolve: "gatsby-plugin-antd", options: { style: true } },
    {
      resolve: "gatsby-plugin-typescript",
      options: {
        isTSX: true,
        jsxPragma: "jsx",
        allExtensions: true
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `${__dirname}/content`,
        path: `${__dirname}/content`,
        ignore: ["**/.*", "**/*.db-journal"]
      }
    },
    {
      resolve: `gatsby-transformer-orga`,
      options: {
        slug: ({ export_file_name }) => `/artical/${export_file_name}`
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Glorg`,
        short_name: `Glorg`,
        start_url: `/`,
        display: `standalone`,
        icon: "src/images/logo.png"
      }
    },
    "gatsby-plugin-offline"
  ]
};
