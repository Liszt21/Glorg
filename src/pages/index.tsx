import { useState } from "react";
import { css } from "@emotion/react";
import Layout from "../layouts";
import { fetchPosts, parseTags, parseTree } from "../data";
import { PostList } from "../components/post";
import { TagsOutlined } from "@ant-design/icons";
import { Row, Col, Space, Affix, Divider, Tag, Statistic } from "antd";

const { Countdown } = Statistic;

export default () => {
  const posts = fetchPosts();
  const tags = parseTags(posts);
  const tree = parseTree(posts);
  const [selected, setSelected] = useState("");

  const count = [
    { title: "文章", value: posts.length },
    { title: "分类", value: tree.length },
    { title: "标签", value: Object.keys(tags).length },
  ];

  const onClickTag = (event) => {
    const tag = event.target.textContent;
    setSelected(selected === tag ? "" : tag);
  };

  return (
    <Layout>
      <Row justify="space-around">
        <Col xs={24} sm={24} md={18}>
          <PostList posts={posts} size="large" pagination={{ pageSize: 6 }} />
        </Col>
        <Col xs={0} sm={0} md={6} style={{ maxWidth: "270px" }}>
          <Affix offsetTop={96}>
            <Space direction="vertical" split={<Divider />}>
              <div>有人看见尘埃，有人看见星辰</div>
              <Countdown
                value={new Date(new Date().getFullYear() + 1, 0, 0)}
                title={new Date().getFullYear() + "年剩余"}
                format="D 天 H 时 m 分 s 秒"
              />
              <Space split={<Divider type="vertical" />}>
                {count.map((item) => {
                  return (
                    <Space
                      direction="vertical"
                      style={{ textAlign: "center" }}
                      size="small"
                      key={item.title}
                    >
                      <span>{item.value}</span>
                      <span>{item.title}</span>
                    </Space>
                  );
                })}
              </Space>
              <div>
                <div>
                  <TagsOutlined />
                  <span style={{ fontSize: "20px" }}>&nbsp;标签&nbsp;</span>
                  <span>/Tags</span>
                </div>
                <div>
                  {Object.keys(tags).map((tag) => (
                    <Tag
                      key={tag}
                      onClick={onClickTag}
                      css={css`
                        cursor: pointer;
                        &:hover {
                          color: #1890ff;
                        }
                      `}
                    >
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            </Space>
          </Affix>
        </Col>
      </Row>
    </Layout>
  );
};
