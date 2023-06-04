"use client";
import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import styled from "styled-components";
import Toast from "../components/ToastAlert";
const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
`;

const LoginPage: React.FC = () => {
  const [toast, setToast] = useState({
    show: true,
    message: "",
    title: "",
  });
  const closeToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };
  const showToast = (message: string, title: string) => {
    console.log(message);
    console.log(title);
    setToast((prev) => ({ show: true, message, title }));
  };
  return (
    <Center>
      {toast.show && (
        <Toast
          message={toast.message}
          title={toast.title}
          showToast={toast.show}
          closeToast={closeToast}
        />
      )}
      <h1>Login</h1>
      <LoginForm showToast={showToast} />
    </Center>
  );
};

export default LoginPage;
