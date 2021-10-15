import { useState } from "react";
import Layout from "../layouts";
import { fetchPosts, parseTree } from "../data";
import { PanelContent } from "../components/panel";
import SEO from "../components/seo";
import { Tree, Space } from "antd";

const { DirectoryTree } = Tree;

const CategoriesPage = () => {
  const [current, setCurrent] = useState({ children: [] } as any);
  const posts = fetchPosts();
  const tree = parseTree(posts);

  const onSelect = (keys, info) => {
    setCurrent(info.node);
  };
  const onExpand = () => {};

  return (
    <Layout>
      <SEO title="Glorg : Catgories" />
      <Space style={{ height: "100%" }} align="start">
        <DirectoryTree
          multiple
          treeData={tree}
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
