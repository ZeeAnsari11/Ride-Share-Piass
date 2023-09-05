import React, { useEffect, useState } from 'react'
import Table from '../../components/Table/Table'
import { Col, Form, Input, Row, Select, Typography } from 'antd'
import InfoCard from '../../components/InfoCard/InfoCard'
import { serverEndpoint } from "../../utils/serverEndpoint";
import axios from "axios";
import { useLocation } from 'react-router-dom';
const Users = () => {

  const location = useLocation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedRowsKeys, setRowsKeys] = useState([])
  const urlSearch = new URLSearchParams(location.search);
  const status = urlSearch.get("type");

  useEffect(() => {
    getAllUsers();
  }, [location.pathname, location.search]);

  useEffect(() => {
    let condition = () => true;
    if (status === "verified") {
      condition = (el) => el.isVerified;
    }
    if (status === "non-verified") {
      condition = (el) => el.isVerified !== true;
    }

    setItems(() => {
      return data.filter(condition);
    })
  }, [status, data]);



  const rowSelection = {
    onChange: (selectedKeys, selectedRows) => {
      setRowsKeys(selectedKeys);
    },
  }

  const getAllUsers = async () => {
    setLoading(true);
    axios.get(`${serverEndpoint}admin/users`)
      .then((verifiedUsers) => {
        setLoading(false);
        setData(verifiedUsers.data.users);
      })
      .catch(err => setLoading(false));
  }

  const handleStatusChange = async (value) => {
    setLoading(true);
    axios.put(`${serverEndpoint}admin/users`, { ids: selectedRowsKeys, status: value })
      .then((verifiedUsers) => {
        form.resetFields();
        setLoading(false);
        setRowsKeys([]);
        getAllUsers();
      })
      .catch(err => setLoading(false));
  }

  return (
    <section>
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} md={16}>
          <Form layout='vertical'>
            <Form.Item name="search" label="Search">
              <Input.Search placeholder="Search" size='large' />
            </Form.Item>
          </Form>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form layout='vertical' form={form}>
            <Form.Item name="status" label="Change Status">
              <Select style={{ width: "100%" }} onChange={handleStatusChange} size='large' disabled={!selectedRowsKeys.length}>
                <Option value="pending">&nbsp; </Option>
                <Option value="accepted">Approved</Option>
                <Option value="rejected">Reject</Option>
              </Select>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <div>
        <InfoCard data={data} />
      </div>
      <Table
        rowSelection={{
          ...rowSelection,
          selectedRowKeys: selectedRowsKeys,
        }}
        data={items}
        rowKey={"_id"}
        loading={loading}
      />
    </section>
  )
}

export default Users