import { Layout, BackTop, Space, Input } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import Menu from "./menu";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

export default ({ children }) => {
  const onSearch = () => {};

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#efefef" }}>
      <Header
        style={{
          width: "81vw",
          margin: "0 auto 10px auto",
          backgroundColor: "white",
          flexFlow: "row",
          display: "flex"
        }}
      >
        <h1>Glorg</h1>
        <Menu />
        <div style={{ flexGrow: 1 }}>
          <Search
            placeholder="input search text"
            style={{ width: 200, margin: 16, float: "right" }}
            onSearch={onSearch}
          ></Search>
        </div>
        <Space>
          <GithubOutlined />
        </Space>
      </Header>
      <Layout style={{ flexDirection: "row", width: "81vw", margin: "0 auto" }}>
        <Content style={{ padding: "1vh 1vw", backgroundColor: "white" }}>
          {children}
        </Content>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        All materials &copy; {`${new Date().getFullYear()}`}, Liszt21.
        <BackTop />
      </Footer>
    </Layout>
  );
};
