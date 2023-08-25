import React, { useEffect, useState } from "react";
import { Table as AntTable, Avatar, Image, Input } from "antd";
import styles from "./Table.module.css";
import { assetsEndpoint } from "../../utils/serverEndpoint";
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
    title: "Image",
    dataIndex: "cnicFront",
    key: "cnicFront",
    render: (_, item) => {
      return <Image src={`${assetsEndpoint}public/images/${item.image}`} height={80} width={80} style={{objectFit: "contain", borderRadius: "50%", backgroundColor: "black"}}/>
    }
  },
  {
    title: "CNIC Front",
    dataIndex: "cnicFront",
    key: "cnicFront",
    render: (_, item) => {
      return <Image src={`${assetsEndpoint}public/images/${item.cnicFront}`} height={80} width={80} style={{objectFit: "contain", borderRadius: "50%", backgroundColor: "black"}}/>
    }
  },
  {
    title: "CNIC Back",
    dataIndex: "cnicBack",
    key: "cnicBack",
    render: (_, item) => {
      return <Image src={`${assetsEndpoint}public/images/${item.cnicBack}`} height={80} width={80} style={{objectFit: "contain", borderRadius: "50%", backgroundColor: "black"}} />
    }
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
];
const Table = ({ data = [] }) => {
  return (
    <>
      <AntTable dataSource={data} columns={columns} />
    </>
  );
};

export default Table;
