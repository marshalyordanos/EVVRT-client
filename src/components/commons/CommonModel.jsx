import React, { useState } from "react";
import { Button, Modal } from "antd";
const CommonModal = ({
  style,
  children,
  isModalOpen,
  setIsModalOpen,
  handleSubmit,
  width,
  title,
  setIMportedData,
}) => {
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIMportedData(null);
  };
  return (
    <>
      <Modal
        width={width}
        footer={false}
        className={style}
        maskClosable={false}
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  );
};
export default CommonModal;
