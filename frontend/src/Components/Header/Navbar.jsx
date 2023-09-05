import { Avatar, Button, Image, Layout, Menu, Popover, theme } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React from 'react'
import Routes from '../../Constants';
import Logo from "../../assets/Images/Logo.png"
import styles from "./Header.module.css"
import { userSignOut } from '../../redux/slices/userSlice';
const Navbar = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    dispatch(userSignOut({}));
    navigate("/signin");
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
        <li> <Link to="/myrides">My Ride </Link> </li>
        <li> <Link to="/PostRide">Post Ride </Link> </li>
        <li> <Link to="/chat">Chat </Link> </li>
        <li> <Link to="">Change Password </Link> </li>
        <li> <Link to="/signin" onClick={handleLogout}>Log out </Link> </li>
      </ul>
    </div>
  )
  return (
    <>
      <Layout  >
        <Header className={styles.Header}>
          <div className={styles.logo}>
            <Image src={Logo} preview={false} width={"100px"}/>
          </div>
          <Menu
            onClick={handleMenuClick}
            className={styles.menu}
            mode="horizontal"
            items={items}
          />
          <div className={styles.login}>
            {
              !user ?
                <div className="flex h-full justify-between items-center">
                  <button className="bg-transparent py-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-4 border border-blue-500 hover:border-transparent rounded-full" onClick={() => navigate("./signin")}>
                    Login
                  </button>
                  <button className="bg-transparent py-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-4 border border-blue-500 hover:border-transparent rounded-full" onClick={() => navigate("./signup")}>
                    Sign up
                  </button>
                </div> :
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
