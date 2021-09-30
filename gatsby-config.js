module.exports = {
  siteMetadata: {
    siteUrl: "https://glorg.liszt.space",
    title: "Glorg"
  },
  plugins: [
    "gatsby-plugin-antd",
    "gatsby-plugin-less",
    "gatsby-plugin-emotion",
    "gatsby-plugin-gatsby-cloud",
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
    }
  ]
};
