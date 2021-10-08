import { Layout, BackTop } from "antd"
import * as React from "react"
import { Link } from "gatsby"
import { Menu, Space } from "antd"
import { GithubOutlined } from "@ant-design/icons"
import { useLocation } from "@reach/router"

const { Header, Sider, Content, Footer } = Layout

export default ({ children }) => {
  const location = useLocation()
  const current = location.pathname.split("/")[1]
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#efefef" }}>
      <Header
        style={{
          width: "81vw",
          margin: "0 auto 10px auto",
          backgroundColor: "white",
          flexFlow: "row",
          display: "flex",
        }}
      >
        <h1>Glorg</h1>
        <Menu mode="horizontal" selectedKeys={[current]}>
          <Menu.Item key="">
            <Link to="/">首页</Link>
          </Menu.Item>
          <Menu.Item key="categories">
            <Link to="/categories">分类</Link>
          </Menu.Item>
          <Menu.Item key="tags">
            <Link to="/tags">标签</Link>
          </Menu.Item>
          <Menu.Item key="archives">
            <Link to="/archives">归档</Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link to="/about">关于</Link>
          </Menu.Item>
        </Menu>
        <div style={{ flexGrow: 1 }}></div>
        <Space>
          <GithubOutlined />
        </Space>
      </Header>
      <Layout style={{ flexDirection: "row", width: "81vw", margin: "0 auto" }}>
        <Content style={{ marginRight: "1vw", padding: "1vh 1vw", backgroundColor: "white" }}>
          {children}
        </Content>
        <Sider style={{ backgroundColor: "white" }}></Sider>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        All materials &copy; {`${new Date().getFullYear()}`}, Liszt21.
        <BackTop />
      </Footer>
    </Layout>
  )
}
