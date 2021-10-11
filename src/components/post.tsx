import { List, Tag, Space } from 'antd';

interface PostData {
  title: string;
  date: string;
  html: string;
  tags: string[];
  path: string;
  category: string;
  summary: string;
}

const PostItem = ({ post, size = "large" }) => {
  return
}

const PostList = ({ posts, size, pagination }) => {
  return (<List
    itemLayout="vertical"
    size={size}
    pagination={pagination}
    dataSource={posts}
    renderItem={(item: PostData) => (
      <List.Item
        key={item.title}
      >
        <List.Item.Meta
          title={<a href={item.path}>{item.title}</a>}
        />
        <p style={{ cursor: 'pointer' }} onClick={() => { window.location.href = item.path }}>{item.summary}</p>
        <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: "space-between" }}>
          <Space>
            {item.tags.map(tag => {
              return (<Tag key={tag}>{tag}</Tag>)
            })}
          </Space>
          <div>{item.date}</div>
        </div>
      </List.Item>
    )}
  />)
}

export { PostList, PostItem };