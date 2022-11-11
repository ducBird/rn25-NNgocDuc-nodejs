import React, { useEffect, useState } from 'react';
import { axiosClient } from '../../libraries/axiosClient';
import { Table, Button, Checkbox, Form, Input } from 'antd';
import './employees.css';

const columns = [
  {
    title: 'Full Name',
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  // {
  //   title: 'Birthday',
  //   dataIndex: 'birthday',
  //   key: 'birthday',
  //   render: (text) => {
  //     return <span>{moment(text).format('DD/MM/yyyy')}</span>;
  //   },
  // },
  {
    title: 'Action',
    dataIndex: '',
    key: '',
  },
];

function ListEmployees() {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    axiosClient.get('/employees').then((response) => {
      setEmployees(response.data);
    });
  }, []);

  const onFinish = (values) => {
    console.log('👌👌👌', values);
  };
  const onFinishFailed = (values) => {
    console.log('💣💣💣 ', values);
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/* FirstName */}
        <Form.Item
          hasFeedback
          className=""
          label="Fisrt Name"
          name="firstName"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input />
        </Form.Item>

        {/* LastName */}
        <Form.Item
          hasFeedback
          className=""
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input />
        </Form.Item>

        {/* Email */}
        <Form.Item
          hasFeedback
          className=""
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: `Invalid Email` },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Phone */}
        <Form.Item
          hasFeedback
          className=""
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: 'Please input your phone number!' },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Address */}
        <Form.Item
          hasFeedback
          className=""
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input />
        </Form.Item>

        {/* Button Save */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
      <Table rowKey="_id" dataSource={employees} columns={columns} />;
    </>
  );
}

export default ListEmployees;
