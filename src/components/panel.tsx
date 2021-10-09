import { Link } from "gatsby";
import { Space, Tooltip, Badge } from "antd";

const PanelHeader = ({ title, count }) => {
  return (
    <Space>
      <span>{title}</span>
      <Badge count={count} style={{ backgroundColor: "rgba(0,0,0,0.5)" }} />
    </Space>
  );
};

const PanelContent = ({ posts }) => {
  return (
    <Space direction="vertical">
      {posts.map((post) => {
        return (
          <Tooltip placement="right" title={post.summary} key={post.title}>
            <Link to={post.path}>{post.title}</Link>
          </Tooltip>
        );
      })}
    </Space>
  );
};

export { PanelHeader, PanelContent };
