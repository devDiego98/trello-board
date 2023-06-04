'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthComponent: React.FC<any> = (props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Check if token exists in sessionStorage or localStorage
      const token = sessionStorage.getItem('token');

      // If token does not exist, redirect to login page
      if (!token) {
          router.push('/login');
      } else {
        setIsLoading(false);
      }
    }, []);

    if (isLoading) {
      return null; // Return null or a loading spinner while authenticating
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
