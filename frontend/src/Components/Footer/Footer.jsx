import { Col, Image, Layout, Row } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import React from "react";
import logo from "../../assets/Images/Home/free.png"
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <>
      <Layout.Footer className={styles.footer} >
        <Row Col={24} className={styles.row}>
          <Col>
            <div className={`${styles.content} pt-6`}>
              <Image
                src={logo}
                height={"40px"}
                width={"40px"}
                style={{ paddingBottom: "3px", marginRight: "10px" }}
                preview={false}
              />
              <p className={styles.title}>Get Rider</p>
            </div>
            <div className={styles.paragraph}>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Excepturi, obcaecati tenetur amet explicabo laboriosam ad quos,
                provident, sed iure asperiores culpa error dicta facere quas
                expedita quis cum officia fuga.
              </p>
            </div>
            <div className={styles.socialicons}>
              <Link to={"/"}><FacebookOutlined style={{margin:"3px"}}/></Link>
              <Link to={"/"}><WhatsAppOutlined style={{margin:"3px"}}/></Link>
              <Link to={"/"}><InstagramOutlined style={{margin:"3px"}} /></Link>
              <Link to={"/"}><LinkedinOutlined style={{margin:"3px"}}/></Link>
              
            </div>
            <div className='text-md text-gray-700 py-4'>© Copyright 2023. All rights reserved.</div>
          </Col>
        </Row>
      </Layout.Footer>
    </>
  );
};

export default Footer;
