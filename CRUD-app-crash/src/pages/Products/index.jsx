import React, { useEffect, useState } from 'react';
import { axiosClient } from '../../libraries/axiosClient';
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
import './products.css';
import moment from 'moment';
import numeral from 'numeral';

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text, record) => {
        return <strong>{record?.category?.name}</strong>;
      },
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => {
        return <strong>{text}</strong>;
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => {
        return <span>{numeral(text).format('0,0$')}</span>;
      },
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      render: (text) => {
        return <span>{numeral(text).format('0,0.0')}%</span>;
      },
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (text) => {
        return <span>{numeral(text).format('0,0.0')}</span>;
      },
    },
    {
      title: 'Supplier',
      dataIndex: 'supplier',
      key: 'supplier',
      render: (text, record) => {
        return <strong>{record?.supplier?.name}</strong>;
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
                  .delete('/products/' + id)
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
    axiosClient.get('/products').then((response) => {
      setProducts(response.data);
    });
  }, [refresh]);

  // get list categories
  useEffect(() => {
    axiosClient.get('/categories').then((response) => {
      setCategories(response.data);
    });
  }, []);

  // get list suppliers
  useEffect(() => {
    axiosClient.get('/suppliers').then((response) => {
      setSuppliers(response.data);
    });
  }, []);

  const onFinish = (values) => {
    axiosClient
      .post('/products', values)
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
      .patch('/products/' + selectedRecord._id, values)
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
        {/* Category */}
        <Form.Item
          className=""
          label="Categories"
          name="categoryId"
          rules={[{ required: true, message: 'Please selected category!' }]}
        >
          <Select
            options={
              categories &&
              categories.map((category) => {
                return {
                  value: category._id,
                  label: category.name,
                };
              })
            }
          />
        </Form.Item>

        {/* ProductName */}
        <Form.Item
          hasFeedback
          className=""
          label="Product Name"
          name="name"
          rules={[{ required: true, message: 'Please input product name!' }]}
        >
          <Input />
        </Form.Item>

        {/* Price */}
        <Form.Item
          hasFeedback
          className=""
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please input price!' }]}
        >
          <InputNumber className="w-[50%]" addonAfter="VND" />
        </Form.Item>

        {/* Discount */}
        <Form.Item hasFeedback className="" label="Discount" name="discount">
          <InputNumber className="w-[50%]" addonAfter="%" />
        </Form.Item>

        {/* Stock */}
        <Form.Item hasFeedback className="" label="Stock" name="stock">
          <InputNumber className="w-[50%]" />
        </Form.Item>

        {/* Supplier */}
        <Form.Item
          className=""
          label="Suppliers"
          name="supplierId"
          rules={[{ required: true, message: 'Please selected suplier!' }]}
        >
          <Select
            options={
              suppliers &&
              suppliers.map((suplier) => {
                return {
                  value: suplier._id,
                  label: suplier.name,
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
      <Table rowKey="_id" dataSource={products} columns={columns} />

      <Modal
        centered
        open={editFormVisible}
        title="Update Products"
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
          {/* Category */}
          <Form.Item
            className=""
            label="Categories"
            name="categoryId"
            rules={[{ required: true, message: 'Please selected category!' }]}
          >
            <Select
              options={
                categories &&
                categories.map((category) => {
                  return {
                    value: category._id,
                    label: category.name,
                  };
                })
              }
            />
          </Form.Item>

          {/* ProductName */}
          <Form.Item
            hasFeedback
            className=""
            label="Product Name"
            name="name"
            rules={[{ required: true, message: 'Please input product name!' }]}
          >
            <Input />
          </Form.Item>

          {/* Price */}
          <Form.Item
            hasFeedback
            className=""
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input price!' }]}
          >
            <InputNumber className="w-[50%]" addonAfter="VND" />
          </Form.Item>

          {/* Discount */}
          <Form.Item hasFeedback className="" label="Discount" name="discount">
            <InputNumber className="w-[50%]" addonAfter="%" />
          </Form.Item>

          {/* Stock */}
          <Form.Item hasFeedback className="" label="Stock" name="stock">
            <InputNumber className="w-[50%]" />
          </Form.Item>

          {/* Supplier */}
          <Form.Item
            className=""
            label="Suppliers"
            name="supplierId"
            rules={[{ required: true, message: 'Please selected suplier!' }]}
          >
            <Select
              options={
                suppliers &&
                suppliers.map((suplier) => {
                  return {
                    value: suplier._id,
                    label: suplier.name,
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

export default Products;
