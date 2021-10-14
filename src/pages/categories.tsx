import { useState } from "react";
import Layout from "../layouts";
import { fetchPosts } from "../data";
import { PanelContent } from "../components/panel";
import { Tree, Space } from "antd";

const { DirectoryTree } = Tree;

const CategoriesPage = () => {
  const [current, setCurrent] = useState({ children: [] } as any);
  const posts = fetchPosts();
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
      key: key + ":" + post.title,
      isLeaf: true,
      ...post,
    });
  });

  const onSelect = (keys, info) => {
    setCurrent(info.node);
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
        {current.isLeaf ? (
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: current.html }}
          ></div>
        ) : (
          <PanelContent posts={current.children} />
        )}
      </Space>
    </Layout>
  );
};

export default CategoriesPage;
