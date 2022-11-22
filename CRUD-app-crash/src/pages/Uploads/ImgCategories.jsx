import React from 'react';
import { Layout, message, Upload, Button } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { AiOutlineUpload } from 'react-icons/ai';

export default function ImgCategories() {
  return (
    <Layout>
      <Content style={{ padding: 12 }}>
        <Upload
          showUploadList={false}
          name="file"
          data={{ name: 'Hello ANTD', description: 'Mô tả ANTD' }}
          action="http://localhost:9000/upload/categories/631731e0f4368ae8174a1a67"
          headers={{ authorization: 'authorization-text' }}
          onChange={(info) => {
            if (info.file.status !== 'uploading') {
              console.log(info.file, info.fileList);
            }

            if (info.file.status === 'done') {
              message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
          }}
        >
          <Button icon={<AiOutlineUpload />}>Click to Upload</Button>
        </Upload>
      </Content>
    </Layout>
  );
}