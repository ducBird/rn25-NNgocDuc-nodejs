import React, { useEffect, useState } from 'react';
import { axiosClient } from '../../libraries/axiosClient';
import { Table, Button, Popconfirm, Form, Input, Modal, message } from 'antd';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import './categories.css';
import moment from 'moment';
import FormCpn from '../FormAntd/FormCpn';
import TextArea from 'antd/lib/input/TextArea';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const columns = [
    {
      title: 'Name Category',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '60%',
    },
    {
      title: 'Actions',
      key: 'actions',
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
                  .delete('/categories/' + id)
                  .then((response) => {
                    message.success('Deleted Successfully!');
                    setRefresh((f) => f + 1);
                  })
                  .catch((err) => {
                    console.log(err);
                    message.error('Deleted Failed!');
                  });
              }}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <Button danger className="py-5 flex items-center">
                {<AiFillDelete size={'16px'} />}
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    axiosClient
      .get('/categories')
      .then((response) => {
        // console.log(response.data);
        setCategories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const onFinish = (values) => {
    axiosClient
      .post('/categories', values)
      .then((response) => {
        message.success('Successfully Added!');
        createForm.resetFields();
        setRefresh((f) => f + 1);
      })
      .catch((err) => {
        message.error('Deleted Failed!');
        console.log(err);
      });
    console.log('👌👌👌', values);
  };
  const onFinishFailed = (errors) => {
    console.log('💣💣💣 ', errors);
  };

  const onUpdateFinish = (values) => {
    axiosClient
      .patch('/categories/' + selectedRecord._id, values)
      .then((response) => {
        message.success('Successfully Updated!');
        updateForm.resetFields();
        setRefresh((f) => f + 1);
        setEditFormVisible(false);
      })
      .catch((err) => {
        message.error('Updated Failed!');
        console.log(err);
      });
  };
  const onUpdateFinishFailed = (errors) => {
    console.log('💣💣💣 ', errors);
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
        {/* Name */}
        <Form.Item
          hasFeedback
          className=""
          label="Name Category"
          name="name"
          rules={[{ required: true, message: 'Please input name category!' }]}
        >
          <Input />
        </Form.Item>

        {/* Description */}
        <Form.Item
          hasFeedback
          className=""
          label="Description"
          name="description"
        >
          <TextArea rows={5} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
      <Table rowKey={'_id'} dataSource={categories} columns={columns} />

      <Modal
        centered
        title="Update Category"
        open={editFormVisible}
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
          {/* Name */}
          <Form.Item
            hasFeedback
            className=""
            label="Name Category"
            name="name"
            rules={[{ required: true, message: 'Please input name category!' }]}
          >
            <Input />
          </Form.Item>

          {/* Description */}
          <Form.Item
            hasFeedback
            className=""
            label="Description"
            name="description"
          >
            <TextArea rows={5} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Categories;
