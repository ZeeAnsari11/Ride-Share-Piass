import React, { useEffect, useState } from 'react'
import Table from '../../components/Table/Table'
import { Col, Form, Input, Row } from 'antd'
import InfoCard from '../../components/InfoCard/InfoCard'
import { serverEndpoint } from "../../utils/serverEndpoint";
import axios from "axios";
import styles from "../../components/Table/Table.module.css";
import { useLocation } from 'react-router-dom';
const Users = () => {

  const [data, setData] = useState([]);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  useEffect(() => {
    getAllUsers();
  }, [location.pathname, location.search]);

  const getAllUsers = async () => {
    axios.get(`${serverEndpoint}admin/users`)
      .then((verifiedUsers) => {
        setData(verifiedUsers.data.users);
      });
  }
  return (
    <section>
      <h1> {urlSearch.get("type")} </h1>
      <Form layout="vertical" >
        <Row gutter={20}>
          <Col xs={24} sm={12} md={6}>
            <Form.Item label="Search">
              <Input placeholder="Search" size='large' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Input.Search placeholder="Search" size='large' />
          </Col>
        </Row>
      </Form>
      <div>
        <InfoCard />
      </div>
      <Table data={data} />
    </section>
  )
}

export default Users