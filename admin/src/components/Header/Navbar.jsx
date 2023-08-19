import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme,Image } from 'antd';
const { Header, Content, Sider } = Layout;
import Logo from "../../assets/logo1.png"
import Table from '../Table/Table';
const Navbar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{height:'100vh'}}>
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
        <div className="demo-logo-vertical" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <Image src={Logo} height={"100px"} width={"120px"} preview={false}/>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
          items={[{icon: UserOutlined, name: "Users"}].map(
            (el, index) => ({
              key: el.name,
              icon: React.createElement(el.icon),
              label: el.name,
            }),
          )}
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
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
           <Table/>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Navbar;