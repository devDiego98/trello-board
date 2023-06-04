"use client";
import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import styled from "styled-components";
const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
`;

const LoginPage: React.FC = () => {
  return (
    <Center>
      <h1>Login</h1>
      <LoginForm />
    </Center>
  );
};

export default LoginPage;
