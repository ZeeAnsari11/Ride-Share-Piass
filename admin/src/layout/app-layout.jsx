import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Image } from "antd";
const { Header, Content, Sider } = Layout;
import Routes from "../components/Constants/index";
import Logo from "../assets/logo1.png";
import Styles from "./Admin.module.css";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Admin = () => {
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.user);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const items = Object.values(Routes).map((el) => ({
    label: el.name,
    key: el.key,
    icon: el.icon,
  }));
  const handleMenuClick = ({ key, type }) => {
    let item = Routes[key];
    navigate(item.path);
    console.log(item);
  };

  if(!user){
    <Navigate to="/login" />
  }
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="50"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div
          className="demo-logo-vertical"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image src={Logo} height={"100px"} width={"120px"} preview={false} />
        </div>
        <Menu
          onClick={handleMenuClick}
          mode="vertical"
          theme="dark"
          className={Styles.menubar}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;
