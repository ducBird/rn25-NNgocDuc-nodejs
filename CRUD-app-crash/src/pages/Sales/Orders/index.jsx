import React, { useEffect, useState } from 'react';
import { axiosClient } from '../../../libraries/axiosClient';
import {
  Table,
  Button,
  Popconfirm,
  Form,
  Input,
  InputNumber,
  Modal,
  message,
  Select,
} from 'antd';
import { AiFillEdit, AiFillDelete, AiFillQuestionCircle } from 'react-icons/ai';
import './orders.css';
import moment from 'moment';
import numeral from 'numeral';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const columns = [
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (text) => {
        return <span>{moment(text).format('DD/MM/yyyy')}</span>;
      },
    },
    {
      title: 'ShippedDate',
      dataIndex: 'shippedDate',
      key: 'shippedDate',
      render: (text) => {
        return <span>{moment(text).format('DD/MM/yyyy')}</span>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        return <span>{text}</span>;
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => {
        return <span>{text}</span>;
      },
    },
    {
      title: 'Shipping Address',
      dataIndex: 'shippingAddress',
      key: 'shippingAddress',
      render: (text) => {
        return <span>{text}</span>;
      },
    },
    {
      title: 'Payment Type',
      dataIndex: 'paymentType',
      key: 'paymentType',
      render: (text) => {
        return <span>{text}</span>;
      },
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      render: (text, record) => {
        return <strong>{record?.customer?.lastName}</strong>;
      },
    },
    {
      title: 'Employee',
      dataIndex: 'employee',
      key: 'employee',
      render: (text, record) => {
        return <strong>{record?.employee?.fullName}</strong>;
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
              icon={
                <AiFillQuestionCircle size={'24px'} className="text-red-600" />
              }
              title="Are you sure to delete this task?"
              onConfirm={() => {
                const id = record._id;
                axiosClient
                  .delete('/orders/' + id)
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
    axiosClient.get('/orders').then((response) => {
      setOrders(response.data);
    });
  }, [refresh]);

  // get list customers
  useEffect(() => {
    axiosClient.get('/customers').then((response) => {
      setCustomers(response.data);
    });
  }, []);

  // get list employees
  useEffect(() => {
    axiosClient.get('/employees').then((response) => {
      setEmployees(response.data);
    });
  }, []);

  const onFinish = (values) => {
    axiosClient
      .post('/orders', values)
      .then((response) => {
        message.success('Successfully Added!');
        createForm.resetFields();
        setRefresh((f) => f + 1);
      })
      .catch((err) => {
        message.error('Added Failed');
        // console.log(err);
      });
    console.log('👌👌👌', values);
  };
  const onFinishFailed = (errors) => {
    console.log('💣💣💣 ', errors);
  };
  const onUpdateFinish = (values) => {
    axiosClient
      .patch('/orders/' + selectedRecord._id, values)
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
      <h1 className="text-center p-2 mb-5 text-xl">📑 Orders 📑</h1>
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
        {/* Created Date */}
        <Form.Item
          hasFeedback
          className=""
          label="Created Date"
          name="createdDate"
        >
          <Input />
        </Form.Item>

        {/* Shipped Date */}
        <Form.Item
          hasFeedback
          className=""
          label="Shipped Date"
          name="shippedDate"
          // rules={[
          //   { type: 'date', message: 'Invalid datetime' },
          //   {
          //     validator: function (value) {
          //       if (!value) return true;
          //       if (value < this.createDate) {
          //         return false;
          //       }
          //       return true;
          //     },
          //     message: `Shipped date: {VALUE} < Created Date!`,
          //   },
          // ]}
        >
          <Input />
        </Form.Item>

        {/* Status */}
        <Form.Item
          hasFeedback
          className=""
          label="Status"
          name="status"
          rules={[{ required: true, message: 'Please select status!' }]}
        >
          <Select
            options={[
              {
                value: 'COMPLETED',
                label: 'COMPLETED',
              },
              {
                value: 'WAITING',
                label: 'WAITING',
              },
              {
                value: 'CANCELED',
                label: 'CANCELED',
              },
            ]}
          />
        </Form.Item>

        {/* Description */}
        <Form.Item
          hasFeedback
          className=""
          label="Description"
          name="description"
        >
          <Input />
        </Form.Item>

        {/* Shipping Address */}
        <Form.Item
          hasFeedback
          className=""
          label="Shipping Address"
          name="shippingAddress"
          rules={[
            { required: true, message: 'Please input Shipping Address!' },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Payment Type */}
        <Form.Item
          hasFeedback
          className=""
          label="Payment Type"
          name="paymentType"
          rules={[{ required: true, message: 'Please select payment type!' }]}
        >
          <Select
            options={[
              {
                value: 'CREDIT CARD',
                label: 'CREDIT CARD',
              },
              {
                value: 'CASH',
                label: 'CASH',
              },
            ]}
          />
        </Form.Item>

        {/* Customer */}
        <Form.Item
          className=""
          label="Customers"
          name="customerId"
          rules={[{ required: true, message: 'Please selected customer!' }]}
        >
          <Select
            options={
              customers &&
              customers.map((customer) => {
                return {
                  value: customer._id,
                  label: customer.lastName,
                };
              })
            }
          />
        </Form.Item>

        {/* Employee */}
        <Form.Item
          className=""
          label="Employees"
          name="employeeId"
          rules={[{ required: true, message: 'Please selected suplier!' }]}
        >
          <Select
            options={
              employees &&
              employees.map((suplier) => {
                return {
                  value: suplier._id,
                  label: suplier.fullName,
                };
              })
            }
          />
        </Form.Item>

        {/* Button Save */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
      <Table rowKey="_id" dataSource={orders} columns={columns} />

      <Modal
        centered
        open={editFormVisible}
        title="Update Orders"
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
          {/* Created Date */}
          <Form.Item
            hasFeedback
            className=""
            label="Created Date"
            name="createdDate"
          >
            <Input />
          </Form.Item>

          {/* Shipped Date */}
          <Form.Item
            hasFeedback
            className=""
            label="Shipped Date"
            name="shippedDate"
            rules={[
              { type: 'date', message: 'Invalid datetime' },
              // {
              //   validator: function (value) {
              //     if (!value) return true;
              //     if (value < this.createDate) {
              //       return false;
              //     }
              //     return true;
              //   },
              //   message: `Shipped date: {VALUE} < Created Date!`,
              // },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Status */}
          <Form.Item
            hasFeedback
            className=""
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select status!' }]}
          >
            <Select
              options={[
                {
                  value: 'COMPLETED',
                  label: 'COMPLETED',
                },
                {
                  value: 'WAITING',
                  label: 'WAITING',
                },
                {
                  value: 'CANCELED',
                  label: 'CANCELED',
                },
              ]}
            />
          </Form.Item>

          {/* Description */}
          <Form.Item
            hasFeedback
            className=""
            label="Description"
            name="description"
          >
            <Input />
          </Form.Item>

          {/* Shipping Address */}
          <Form.Item
            hasFeedback
            className=""
            label="Shipping Address"
            name="shippingAddress"
            rules={[
              { required: true, message: 'Please input Shipping Address!' },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Payment Type */}
          <Form.Item
            hasFeedback
            className=""
            label="Payment Type"
            name="paymentType"
            rules={[{ required: true, message: 'Please select payment type!' }]}
          >
            <Select
              options={[
                {
                  value: 'CREDIT CARD',
                  label: 'CREDIT CARD',
                },
                {
                  value: 'CASH',
                  label: 'CASH',
                },
              ]}
            />
          </Form.Item>

          {/* Customer */}
          <Form.Item
            className=""
            label="Customers"
            name="customerId"
            rules={[{ required: true, message: 'Please selected customer!' }]}
          >
            <Select
              options={
                customers &&
                customers.map((customer) => {
                  return {
                    value: customer._id,
                    label: customer.lastName,
                  };
                })
              }
            />
          </Form.Item>

          {/* Employee */}
          <Form.Item
            className=""
            label="Employees"
            name="employeeId"
            rules={[{ required: true, message: 'Please selected suplier!' }]}
          >
            <Select
              options={
                employees &&
                employees.map((suplier) => {
                  return {
                    value: suplier._id,
                    label: suplier.fullName,
                  };
                })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Orders;
