import { Affix, BackTop, Space, Input, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Menu from "./menu";

const { Search } = Input;

const styles = {
  container: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "white"
  },
  header: {
    height: "48px",
    width: "100%",
    boxShadow: "0 0 3px #ccc",
    backgroundColor: "white"
  },
  content: {
    minHeight: "calc(100vh - 144px)",
    width: "100%"
  },
  footer: { minHeight: "96px" }

}

export default ({ children }) => {
  const onSearch = () => { };
  return (
    <div style={styles.container}>
      <Affix>
        <Row style={styles.header} justify="space-between" align='middle'>
          <Col xs={0} sm={2} md={2} lg={4} style={{ textAlign: 'center' }}>GLORG</Col>
          <Col xs={11} sm={6} md={8} lg={10}><Menu /></Col>
          <Col xs={12} sm={14} md={8} lg={6}>
            <Search
              placeholder="input search text"
              style={{ maxWidth: 200 }}
              onSearch={onSearch}
            />
          </Col>
          <Col xs={1} sm={2} md={4} lg={2}>
            <UserOutlined />
          </Col>
        </Row>
      </Affix>
      <div style={styles.content}>{children}</div>
      <Row style={styles.footer}>
        <Col span={24} style={{ margin: "auto", textAlign: "center" }}>
          All materials &copy; {`${new Date().getFullYear()}`}, Liszt21.
        </Col>
      </Row>
      <BackTop />
    </div>
  );
};
