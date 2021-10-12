import { Menu } from "antd";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import { HomeOutlined, TagsOutlined, UserOutlined, AppstoreOutlined, FileZipOutlined } from "@ant-design/icons"
import * as React from "react";

const MainMenu = () => {
  const items = [
    { name: "首页", path: "/", key: "", icon: <HomeOutlined /> },
    { name: "分类", path: "/categories", key: "categories", icon: <AppstoreOutlined /> },
    { name: "标签", path: "/tags", key: "tags", icon: <TagsOutlined /> },
    { name: "归档", path: "/archives", key: "archives", icon: <FileZipOutlined /> },
    { name: "关于", path: "/about", key: "about", icon: <UserOutlined /> },
  ];
  const location = useLocation();
  const current = location.pathname.split("/")[1];
  return (
    <Menu
      mode="horizontal"
      selectedKeys={[current]}
    >
      {items.map((item) => {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.path}>{item.name}</Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default MainMenu;
