import * as React from "react"
import { List, Avatar, Space, Tag } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

interface PostData {
  title: string;
  excerpt: string;
  date: string;
  content: string;
  tags: string[];
  category: string;
  path: string;
}

const PostList = ({posts}) => {
  return (<List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 6,
    }}
    dataSource={posts}
    footer={
      <div> </div>
    }
    renderItem={(item:PostData) => (
      <List.Item
        key={item.title}
      >
        <List.Item.Meta
          // avatar={<Avatar src={item.avatar} />}
          title={<a href={item.path}>{item.title}</a>}
          // description={<a href={item.path} >{item.excerpt}</a>}
        />
        <p style={{cursor: 'pointer'}} onClick={()=> {window.location.href=item.path}}>{item.excerpt}</p>
        <div style={{display: 'flex', flexFlow: 'row wrap', justifyContent: "space-between"}}>
          <div>
          {item.tags.map(tag => {
            return (<Tag key={tag}>{tag}</Tag>)
          })}
          </div>
          <div>{item.date}</div>
        </div>
      </List.Item>
    )}
  />)
}

export default PostList;