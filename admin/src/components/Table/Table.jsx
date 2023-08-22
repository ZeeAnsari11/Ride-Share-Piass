import React, { useEffect, useState } from "react";
import { Table as AntTable, Input } from "antd";
import styles from "./Table.module.css";
import { serverEndpoint } from "../../../utils/serverEndpoint";
import axios from "axios";
import InfoCard from "../InfoCard/InfoCard";
const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "FullName",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "CNIC Front",
    dataIndex: "cnicFront",
    key: "cnicFront",
  },
  {
    title: "CNIC Back",
    dataIndex: "cnicBack",
    key: "cnicBack",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "PhoneNo",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Status",
    dataIndex: "verified",
    key: "verified",
  },
];
const Table = () => {
  let [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${serverEndpoint}users/verified`).then((verifiedUsers) => {
      console.log("==================verifi========", verifiedUsers);
      setData(verifiedUsers.data.users);
    });
  }, []);
  console.log("=====data======", data);
  return (
    <>
      <div className={styles.Table}>
        <Input placeholder="Search" style={{ width: "500px" }} />
        </div>
        <div>
          <InfoCard />
        </div>
      
      <AntTable dataSource={data} columns={columns} />
    </>
  );
};

export default Table;
