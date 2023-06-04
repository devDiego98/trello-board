'use client'
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface FormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const router = useRouter()
  const [isRegister, setIsRegister] = useState(false);

  const initialValues: FormValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required')
  });

  const handleSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const endpoint = isRegister ? 'https://reqres.in/api/register' : 'https://reqres.in/api/login';

    try {
      const response = await axios.post(endpoint, values)
      if(response.data.token){
        sessionStorage.setItem("token",response.data.token)
        router.push('/')
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSwitchForm = () => {
    setIsRegister((prevState) => !prevState);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <div>
          <label htmlFor="email">Email:</label>
          <Field type="email" id="email" name="email" />
          <ErrorMessage name="email" component="div" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <Field type="password" id="password" name="password" />
          <ErrorMessage name="password" component="div" />
        </div>
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
        <p onClick={handleSwitchForm}>
          {isRegister ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
        </p>
      </Form>
    </Formik>
  );
};

export default LoginForm;
