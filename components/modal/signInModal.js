import React from "react";
import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { confirm } = Modal;

function signInModal() {
  confirm({
    title: "Do you Want to delete these items?",
    icon: <ExclamationCircleOutlined />,
    content: "Some descriptions",
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}

ReactDOM.render(
  <Space>
    <Button onClick={signInModal}>Confirm</Button>
  </Space>,
  mountNode
);

export default signInModal;
