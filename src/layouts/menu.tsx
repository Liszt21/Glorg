import { Menu } from "antd";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";

const MainMenu = () => {
  const items = [
    { name: "首页", path: "/", key: "home" },
    { name: "分类", path: "/categories", key: "categories" },
    { name: "标签", path: "/tags", key: "tags" },
    { name: "归档", path: "/archives", key: "archives" },
    { name: "关于", path: "/about", key: "about" }
  ];
  const location = useLocation();
  const current = location.pathname.split("/")[1];
  return (
    <Menu mode="horizontal" selectedKeys={[current]}>
      {items.map((item) => {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.path}>{item.name}</Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default MainMenu;
