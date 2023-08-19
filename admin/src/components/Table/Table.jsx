import React from "react";
import { Table as AntTable, Input } from "antd";
import styles from "./Table.module.css"
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
    dataIndex: "name",
    key: "fullname",
  },
  {
    title: "CNIC Front",
    dataIndex: "Cnic",
    key: "cnicfront",
  },
  {
    title: "CNIC Back",
    dataIndex: "CnicBack",
    key: "cnicback",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "PhoneNo",
    dataIndex: "Phoneno",
    key: "phoneno",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];
const Table = () => {
  return (
    <>
      <div className={styles.Table}>
        <Input placeholder="Search" style={{ width: "300px" }} />
        <Input placeholder="Search" style={{ width: "300px" }} />

      </div>
      <AntTable dataSource={dataSource} columns={columns} />
    </>
  );
};

export default Table;
