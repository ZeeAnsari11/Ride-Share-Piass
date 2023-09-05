import React from "react";
import { Layout, Menu, theme, Image, Popover, } from "antd";
const { Header, Sider, Content } = Layout;
import Routes from "../Constants/index";
import Logo from "../assets/logo1.png";
import Styles from "./Admin.module.css";
import { Navigate, Outlet, useNavigate, Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { Avatar } from "antd";
import styles from "./Admin.module.css"
const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
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

  if (!user) {
    return <Navigate to="/login" />
  }
  const handleLogout = ()=>{
    localStorage.clear();
    dispatch(userSignOut({}));
    navigate("/login");
  }
  const AvatarContent = (
    <div className={styles.Avatar_content}>
      <ul>
        <li> <Link to="/?type=all">Home</Link> </li>
        <li> <Link to="#" onClick={handleLogout} >Log out </Link> </li>
      </ul>
    </div>
  )
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
            display: "flex",
            justifyContent: "flex-end",
            paddingInline: "20px"
          }}
        >
          <Popover placement="bottomRight" content={AvatarContent} className={styles.Login_avatar} overlayStyle={{ width: "220px", padding: "0px" }}>
            <Avatar size={50}>
              {user.fullName?.[0]}
            </Avatar>
          </Popover>

        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflowY: "auto",
            overflowX: "hidden"
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
