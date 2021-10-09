import { graphql, useStaticQuery, Link } from "gatsby";
import { Tooltip, Collapse, Space, Badge } from "antd";
import Layout from "../layouts";
import * as React from "react";

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
              header={
                <Space>
                  <span>{key}</span>{" "}
                  <Badge
                    count={posts.length}
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                  />
                </Space>
              }
              key={key}
            >
              <Space direction="vertical">
                {posts.map((post) => {
                  return (
                    <Tooltip
                      placement="right"
                      title={post.summary}
                      key={post.title}
                    >
                      <Link to={post.path}>{post.title}</Link>
                    </Tooltip>
                  );
                })}
              </Space>
            </Panel>
          );
        })}
      </Collapse>
    </Layout>
  );
};

export default TagsPage;
