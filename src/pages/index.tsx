import { graphql, useStaticQuery, Link } from "gatsby";
import PostList from "../components/postList";
import Layout from "../layouts";

export default () => {
  const data = useStaticQuery(graphql`
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
            date(formatString: "lll", locale: "zh-cn")
            export_file_name
            keyword
            tags
          }
          excerpt
          html
        }
      }
    }
  `);

  const posts = data.allOrgContent.nodes.map((node) => {
    return {
      title: node.metadata.title,
      content: node.html,
      date: node.metadata.date,
      tags: node.metadata.tags,
      category: node.metadata.category,
      excerpt: node.excerpt,
      path: node.fields.path
    };
  });

  return (
    <Layout>
      <PostList posts={posts} />
    </Layout>
  );
};
