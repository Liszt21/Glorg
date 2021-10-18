import { useState } from "react";
import Layout from "../layouts";
import { fetchPosts, parseTree } from "../data";
import { PanelContent } from "../components/panel";
import Content from "../components/content";
import SEO from "../components/seo";
import { Tree, Space, Row, Col, Affix, Card } from "antd";
import { Link } from "gatsby";

const { DirectoryTree } = Tree;

const ChildrenList = ({ node }) => {
  return (
    <Space direction="vertical">
      {node.children.map((n) => {
        return n.isLeaf ? (
          <Link to={n.path} key={n.title}>
            {n.title}
          </Link>
        ) : (
          <p key={n.title}>{n.title}</p>
        );
      })}
    </Space>
  );
};

const SummaryItem = ({ node }) => {
  return (
    <Card title={node.title}>
      {node.isLeaf ? (
        <Link to={node.path}>{node.summary}</Link>
      ) : (
        <ChildrenList node={node} />
      )}
    </Card>
  );
};

const Summary = ({ nodes }) => {
  return (
    <Space wrap>
      {nodes.map((node) => {
        return <SummaryItem key={node.title} node={node} />;
      })}
    </Space>
  );
};

const CategoriesPage = () => {
  const posts = fetchPosts();
  const tree = parseTree(posts);
  const [current, setCurrent] = useState({ children: [] } as any);

  const onSelect = (keys, info) => {
    setCurrent(info.node);
  };
  const onExpand = () => {};

  return (
    <Layout>
      <SEO title="Glorg : Catgories" />
      <Row justify="space-around" gutter={10}>
        <Col sm={10} md={8} lg={6}>
          <Affix offsetTop={96}>
            <div>目录</div>
            <DirectoryTree
              multiple
              treeData={tree}
              onSelect={onSelect}
              onExpand={onExpand}
              style={{ background: "rgba(0,0,0,0.05", height: "100%" }}
            />
          </Affix>
        </Col>
        <Col sm={14} md={16} lg={18}>
          {current.isLeaf ? (
            <Content post={current} />
          ) : (
            <Summary nodes={current.children ? current.children : current} />
          )}
        </Col>
      </Row>
    </Layout>
  );
};

export default CategoriesPage;
