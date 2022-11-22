import React from 'react';
import { Table, Button, Form, message, Select } from 'antd';
import { OrderStatus } from '../../../meta/OrderStatus';
import { axiosClient } from '../../../libraries/axiosClient';
import numeral from 'numeral';

export default function SearchOrdersByStatus() {
  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      render: (text, record) => {
        return <strong>{record.customer?.lastName}</strong>;
      },
    },
    {
      title: 'Payment Type',
      dataIndex: 'paymentType',
      key: 'paymentType',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },

    {
      title: 'Employee',
      dataIndex: 'employee',
      key: 'employee',
      render: (text, record) => {
        return <strong>{record.employee?.fullName}</strong>;
      },
    },
    {
      title: 'Total money',
      dataIndex: 'total',
      key: 'total',
      render: (text, record) => {
        const { orderDetails } = record;

        let total = 0;
        orderDetails.forEach((od) => {
          let sum = od.quantity * od.product.total;
          total = total + sum;
        });

        return <strong>{numeral(total).format('0,0$')}</strong>;
      },
    },
  ];
  const [loading, setLoading] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const [searchForm] = Form.useForm();

  const onFinish = (values) => {
    setLoading(true);
    axiosClient
      .post('/orders/questions/7', values)
      .then((response) => {
        // console.log(response.data);
        setOrders(response.data);
        setLoading(false);
      })
      .catch((err) => {
        message.error('Lỗi!');
        setLoading(false);
      });
  };

  const onFinishFailed = (errors) => {
    console.log('🐣', errors);
  };

  return (
    <div>
      <Form
        form={searchForm}
        name="search-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        // initialValues={{ status: '' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item label="Order Status" name="status">
          <Select options={OrderStatus} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            {loading ? 'Processing data ...' : 'Filter'}
          </Button>
        </Form.Item>
      </Form>
      <Table rowKey="_id" dataSource={orders} columns={columns} />
    </div>
  );
}
