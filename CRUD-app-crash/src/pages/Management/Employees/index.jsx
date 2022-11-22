import React, { useEffect, useState } from 'react';
import { axiosClient } from '../../../libraries/axiosClient';
import { Table, Button, Popconfirm, Form, Input, Modal, message } from 'antd';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import './employees.css';
import moment from 'moment';

function ListEmployees() {
  const [employees, setEmployees] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

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
    {
      title: 'Birthday',
      dataIndex: 'birthDay',
      key: 'birthDay',
      render: (text) => {
        return <span>{moment(text).format('DD/MM/yyyy')}</span>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '1%',
      render: (text, record) => {
        return (
          <div className="flex gap-5">
            {/* Button Edit */}
            <Button
              className="py-5 flex items-center"
              onClick={() => {
                setSelectedRecord(record);
                updateForm.setFieldsValue(record);
                setEditFormVisible(true);
              }}
            >
              {<AiFillEdit size={'16px'} />}
            </Button>
            {/* Button Delete */}
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={() => {
                const id = record._id;
                axiosClient
                  .delete('/employees/' + id)
                  .then((response) => {
                    message.success('Deleted Successfully');
                    setRefresh((f) => f + 1);
                  })
                  .catch((errors) => {
                    message.error('Deleted Failed');
                  });
              }}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <Button className="py-5 flex items-center" danger>
                {<AiFillDelete size={'16px'} />}
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    axiosClient.get('/employees').then((response) => {
      setEmployees(response.data);
    });
  }, [refresh]);

  const onFinish = (values) => {
    axiosClient
      .post('/employees', values)
      .then((response) => {
        message.success('Successfully Added');
        createForm.resetFields(); //reset input form
        setRefresh((f) => f + 1);
      })
      .catch((err) => {
        message.error('Added Failed');
      });
    console.log('👌👌👌', values);
  };
  const onFinishFailed = (errors) => {
    console.log('💣💣💣 ', errors);
  };
  const onUpdateFinish = (values) => {
    axiosClient
      .patch('/employees/' + selectedRecord._id, values)
      .then((response) => {
        message.success('Successfully Updated!');
        updateForm.resetFields();
        setRefresh((f) => f + 1);
        setEditFormVisible(false);
      })
      .catch((err) => {
        message.error('Updated Failed!');
      });
  };

  const onUpdateFinishFailed = (errors) => {
    console.log('🐣', errors);
  };

  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  return (
    <>
      <h1 className="text-center p-2 mb-5 text-xl">👩‍💼 Employee 👨‍💼</h1>
      <Form
        form={createForm}
        name="create-form"
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

        {/* BirthDay */}
        <Form.Item hasFeedback className="" label="Birthday" name="birthDay">
          <Input />
        </Form.Item>

        {/* Button Save */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
      <Table rowKey="_id" dataSource={employees} columns={columns} />

      <Modal
        centered
        open={editFormVisible}
        title="Update Employee"
        onOk={() => {
          updateForm.submit();
        }}
        onCancel={() => {
          setEditFormVisible(false);
        }}
        okText="Save Update"
        cancelText="Close"
      >
        <Form
          form={updateForm}
          name="update-form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onUpdateFinish}
          onFinishFailed={onUpdateFinishFailed}
          autoComplete="off"
        >
          {/* FirstName */}
          <Form.Item
            hasFeedback
            className=""
            label="Fisrt Name"
            name="firstName"
            rules={[
              { required: true, message: 'Please input your first name!' },
            ]}
          >
            <Input />
          </Form.Item>

          {/* LastName */}
          <Form.Item
            hasFeedback
            className=""
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: 'Please input your last name!' },
            ]}
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

          {/* BirthDay */}
          <Form.Item hasFeedback className="" label="Birthday" name="birthDay">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ListEmployees;
