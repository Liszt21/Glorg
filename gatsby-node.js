const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `OrgContent`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug
    });
    createNodeField({
      node,
      name: `path`,
      value: `/atrical${slug}${node.metadata.title}`
    });
  }
};

exports.createPages = async function ({ actions, graphql }) {
  const query = await graphql(`
    query {
      allOrgContent(sort: { order: DESC, fields: metadata___date }) {
        edges {
          node {
            excerpt
            html
            metadata {
              date(formatString: "YYYY-MM-DD hh:mm")
              category
              keyword
              summary
              tags
              title
            }
            timeToRead
            fields {
              path
              slug
            }
          }
          previous {
            metadata {
              title
              summary
            }
            fields {
              path
            }
          }
          next {
            metadata {
              summary
              title
            }
            fields {
              path
            }
          }
        }
      }
    }
  `);
  const posts = query.data.allOrgContent.edges.map((edge) => {
    return {
      title: edge.node.metadata.title,
      html: edge.node.html,
      date: edge.node.metadata.date,
      tags: edge.node.metadata.tags,
      category: edge.node.metadata.category,
      summary: edge.node.excerpt,
      path: edge.node.fields.path,
      slug: edge.node.fields.slug,
      previous: edge.previous
        ? {
            title: edge.previous.metadata.title,
            summary: edge.previous.metadata.summary,
            path: edge.previous.fields.path
          }
        : null,
      next: edge.next
        ? {
            title: edge.next.metadata.title,
            summary: edge.next.metadata.summary,
            path: edge.next.fields.path
          }
        : null
    };
  });

  posts.forEach((post) => {
    actions.createPage({
      path: `${post.path}`,
      component: require.resolve(`./src/templates/post.tsx`),
      context: { post }
    });
  });
};
