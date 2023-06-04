import React, { useState } from "react";
import styled from "styled-components";

const ToastContainer = styled.div`
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  background-color: #fff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 10px;
  display: ${(props: { show: boolean }) => (props.show ? "block" : "none")};
`;

const ToastHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ToastCloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #333;
`;

interface ToastProps {
  title: string;
  message: string;
  showToast: boolean;
  closeToast: any;
}

const Toast: React.FC<ToastProps> = ({
  title,
  message,
  showToast,
  closeToast,
}) => {
  const handleClose = () => {
    closeToast();
  };

  return (
    <ToastContainer show={showToast}>
      <ToastHeader>
        <h3>{title}</h3>
        <ToastCloseButton onClick={handleClose}>&times;</ToastCloseButton>
      </ToastHeader>
      <div>{message}</div>
    </ToastContainer>
  );
};

export default Toast;
