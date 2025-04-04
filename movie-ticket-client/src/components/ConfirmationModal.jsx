import React from 'react';
import { Modal, Button } from 'antd';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed?",
  confirmText = "OK",
  cancelText = "Cancel",
  confirmButtonType = "primary",
  cancelButtonType = "default"
}) => {
  return (
    <Modal className='loader-model'
      title={title}
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" type={cancelButtonType} onClick={onClose}>
          {cancelText}
        </Button>,
        <Button 
          key="confirm" 
          type={confirmButtonType} 
          onClick={onConfirm}
          danger={confirmButtonType === "danger"}
        >
          {confirmText}
        </Button>
      ]}
    >
      <p>{message}</p>
    </Modal>
  );
};

export default ConfirmationModal; 