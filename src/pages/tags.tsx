import { graphql, useStaticQuery, Link } from "gatsby";
import { Tooltip, Collapse, Space, Badge } from "antd";
import Layout from "../layouts";
import { PanelHeader, PanelContent } from "../components/panel";

const { Panel } = Collapse;

const TagsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allOrgContent(sort: { order: DESC, fields: metadata___date }) {
        totalCount
        nodes {
          fields {
            path
          }
          metadata {
            title
            tags
            summary
          }
        }
      }
    }
  `);

  const tags = {};

  data.allOrgContent.nodes.forEach((node) => {
    node.metadata.tags.forEach((tag) => {
      if (tags[tag]) {
        tags[tag].push({
          title: node.metadata.title,
          path: node.fields.path,
          summary: node.metadata.summary
        });
      } else {
        tags[tag] = [
          {
            title: node.metadata.title,
            path: node.fields.path,
            summary: node.metadata.summary
          }
        ];
      }
    });
  });

  return (
    <Layout>
      <Collapse accordion>
        {Object.keys(tags).map((key) => {
          const posts = tags[key];
          return (
            <Panel
              header={<PanelHeader title={key} count={posts.length} />}
              key={key}
            >
              <PanelContent posts={posts} />
            </Panel>
          );
        })}
      </Collapse>
    </Layout>
  );
};

export default TagsPage;
