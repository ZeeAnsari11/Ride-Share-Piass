import React from 'react'
import { Menu, Layout, theme, Button, Popover, Avatar } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Routes from '../../Constants';
import styles from "./Header.module.css"
import { userSignOut } from '../../redux/slices/userSlice';
const Navbar = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    dispatch(userSignOut({}));

  }
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const { Header, } = Layout;
  const items = Object.values(Routes).map((el) => (
    {
      label: el.name,
      key: el.key,
      icon: el.icon
    }
  ));
  const handleMenuClick = ({ key, type }) => {
    let item = Routes[key];
    navigate(item.path);
  };
  const Content = (
    <div className={styles.Avatar_content}>
      <ul>
        <li> <Link to="/">Home</Link> </li>
        <li> <Link to="">Profile </Link> </li>
        <li> <Link to="/PostRide">Post Ride </Link> </li>
        <li> <Link to="">Change Password </Link> </li>
        <li> <Link to="#" onClick={handleLogout}>Log out </Link> </li>
      </ul>
    </div>
  )
  return (
    <>
      <Layout style={{ backgroundColor: colorBgContainer }} >
        <Header className={styles.Header} style={{ backgroundColor: colorBgContainer }}>
          <div className={styles.logo}>RideShare</div>
          <Menu
            onClick={handleMenuClick}
            className={styles.menu}
            mode="horizontal"
            items={items}
          />
          <div className={styles.login}>
            {
              !user ?
                <>
                  <Button type="primary" size='middle' shape='round' onClick={() => navigate("./signin")}>
                    Login
                  </Button>
                  <Button type="primary" size='middle' shape='round' onClick={() => navigate("./signup")}>
                    Sign up
                  </Button>
                </> :
                <>
                  <Popover placement="bottomRight" content={Content} className={styles.Login_avatar} overlayStyle={{ width: "220px", padding: "0px" }}>
                    <Avatar size={50}>
                      {user.fullName?.[0]}
                    </Avatar>
                  </Popover>
                </>
            }
          </div>
        </Header>
      </Layout>
    </>
  )
}

export default Navbar;
