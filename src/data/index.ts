import { graphql, useStaticQuery } from "gatsby";

const fetchPosts = () => {
  return useStaticQuery(graphql`
    query {
      allOrgContent(sort: { order: DESC, fields: metadata___date }) {
        totalCount
        nodes {
          fields {
            slug
            path
          }
          metadata {
            category
            title
            date(formatString: "YYYY-MM-DD hh:mm", locale: "zh-cn")
            export_file_name
            keyword
            tags
          }
          excerpt
          html
        }
      }
    }
  `).allOrgContent.nodes.map((node) => {
    return {
      title: node.metadata.title,
      html: node.html,
      date: node.metadata.date,
      tags: node.metadata.tags,
      category: node.metadata.category,
      summary: node.excerpt,
      path: node.fields.path,
      slug: node.fields.slug
    };
  });
}

export { fetchPosts }