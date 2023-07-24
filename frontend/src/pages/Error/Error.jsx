import { Button, } from "antd";
import React from "react";
import styles from "./Error..module.css";
import { useNavigate } from "react-router-dom";
const Error = () => {
  const naviagte = useNavigate();
  return (
    <>
      <div className={styles.Error_wrapper}>
        <div className={styles.content1}>OOPS!</div>
        <div className={styles.content2}>404 - Page Not Found</div>
        <Button type="primary" shape="round" onClick={() => naviagte("/")}>
          Go to Home Page
        </Button>
      </div>
    </>
  );
};

export default Error;
