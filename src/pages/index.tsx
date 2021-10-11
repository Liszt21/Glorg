import { graphql, useStaticQuery, Link } from "gatsby";
import { PostList } from "../components/post";
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
      html: node.html,
      date: node.metadata.date,
      tags: node.metadata.tags,
      category: node.metadata.category,
      summary: node.excerpt,
      path: node.fields.path
    };
  });

  return (
    <Layout>
      <PostList posts={posts} size="large" pagination={{ pageSize: 6 }} />
    </Layout>
  );
};
