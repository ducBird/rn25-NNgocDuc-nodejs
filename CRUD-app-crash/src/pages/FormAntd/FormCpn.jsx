import React from 'react';
import { Button, Popconfirm, Form, Input, Modal, message } from 'antd';

function FormCpn(props) {
  const { columns, onFinish, onFinishFailed } = props;
  return (
    <>
      <Form
        // form={createForm}
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
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default FormCpn;
