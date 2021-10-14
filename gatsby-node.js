const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `OrgContent`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
    createNodeField({
      node,
      name: `path`,
      value: `/atrical${slug}${node.metadata.title}`,
    });
  }
};

exports.createPages = async function ({ actions, graphql }) {
  const orgs = await graphql(`
    query {
      allOrgContent {
        nodes {
          id
          html
          metadata {
            title
          }
          fields {
            slug
            path
          }
          excerpt
        }
      }
    }
  `);
  orgs.data.allOrgContent.nodes.forEach((node) => {
    actions.createPage({
      path: `${node.fields.path}`,
      component: require.resolve(`./src/templates/post.tsx`),
      context: {
        html: node.html,
        title: node.metadata.title,
        summary: node.excerpt,
        slug: node.fields.slug,
        path: node.fields.path,
      },
    });
  });
};
