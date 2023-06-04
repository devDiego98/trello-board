"use client";
import React, { useState } from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styled from "styled-components";
import { useRouter } from "next/navigation";

interface FormValues {
  email: string;
  password: string;
}

const Form = styled(FormikForm)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  min-width: 280px;
  .err {
    color: red;
    font-weight: 600;
    margin-bottom: 8px;
  }
`;
const FormControl = styled.div`
  display: flex;
  justify-content: space-between;
  input {
    padding: 4px 8px;
    border-radius: 8px;
    border: none;
  }
`;
const SubmitBtn = styled.button`
  height: 32px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
`;
const ChangeFormBtn = styled.div`
  background: transparent;
  border: none;
  cursor: pointer;
`;
const LoginForm: React.FC<{ showToast: any }> = ({ showToast }) => {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const endpoint = isRegister
      ? "https://reqres.in/api/register"
      : "https://reqres.in/api/login";

    try {
      const response = await axios.post(endpoint, values);
      if (response.data.token) {
        sessionStorage.setItem("token", response.data.token);
        router.push("/");
      }
    } catch (error: any) {
      showToast(error.response.data.error, "Request Failed");
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSwitchForm = () => {
    setIsRegister((prevState) => !prevState);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormControl>
          <label htmlFor="email">Email:</label>
          <Field type="email" id="email" name="email" />
        </FormControl>
        <ErrorMessage className="err" name="email" component="div" />
        <FormControl>
          <label htmlFor="password">Password:</label>
          <Field type="password" id="password" name="password" />
        </FormControl>
        <ErrorMessage className="err" name="password" component="div" />
        <SubmitBtn type="submit">{isRegister ? "Register" : "Login"}</SubmitBtn>
        <ChangeFormBtn onClick={handleSwitchForm}>
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </ChangeFormBtn>
      </Form>
    </Formik>
  );
};

export default LoginForm;
