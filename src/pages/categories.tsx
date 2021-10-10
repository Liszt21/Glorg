import { graphql, useStaticQuery, Link } from "gatsby";
import { Tree, Space } from "antd";
import Layout from "../layouts";
import { PanelContent } from "../components/panel";
import { useState } from "react";

const { DirectoryTree } = Tree;

const CategoriesPage = () => {
  const [html, setHtml] = useState("<h1>HTML</h1>");
  const [isLeaf, setIsLeaf] = useState(false);
  const [current, setCurrent] = useState([]);
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
      excerpt: node.excerpt,
      path: node.fields.path,
      slug: node.fields.slug
    };
  });

  const tree = { children: [] };

  posts.forEach((post) => {
    let current = tree;
    let key = "";
    const paths = post.slug.split("/");
    paths.forEach((path) => {
      if (path !== "") {
        let index = current.children.findIndex((item) => item.title === path);
        key += "/" + path;
        if (index === -1) {
          index = current.children.push({ title: path, key, children: [] }) - 1;
        }
        current = current.children[index];
      }
    });
    current.children.push({
      title: post.title,
      key: key + ":" + post.title,
      isLeaf: true,
      html: post.html,
      path: post.path,
      summary: post.excerpt
    });
  });

  const onSelect = (keys, info) => {
    if (info.node.isLeaf) {
      setHtml(info.node.html);
    } else {
      setCurrent(info.node.children);
    }
    setIsLeaf(info.node.isLeaf);
  };
  const onExpand = () => {};

  return (
    <Layout>
      <Space style={{ height: "100%" }} align="start">
        <DirectoryTree
          multiple
          treeData={tree.children}
          onSelect={onSelect}
          onExpand={onExpand}
          style={{ background: "rgba(0,0,0,0.05", height: "100%" }}
        />
        {isLeaf ? (
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
        ) : (
          <PanelContent posts={current} />
        )}
      </Space>
    </Layout>
  );
};

export default CategoriesPage;
