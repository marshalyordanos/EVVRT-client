import { Button, Modal } from "antd";
import React from "react";

const CommonDeleteModal = ({
  title = "Delete",
  children,
  setIsModalOpen,
  handleDelete,
  isModalOpen,
  loading,
}) => {
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleDelete}
      footer={[
        <Button key="back" onClick={() => setIsModalOpen(false)}>
          Cancel
        </Button>,
        <Button
          danger
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleDelete}
        >
          {title == "Delete" ? "Delete" : "Disabled"}
        </Button>,
      ]}
      onCancel={() => setIsModalOpen(false)}
    >
      {children}
    </Modal>
  );
};

export default CommonDeleteModal;
