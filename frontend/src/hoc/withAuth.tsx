import React from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent: React.ComponentType<any>) => { 
    // Ensure the component is a valid React component


  return (props) => {
    const router = useRouter();
    const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('role'); // Check for authentication

    React.useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login'); // Redirect to login if not authenticated
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null; // Optionally return a loading state or null while redirecting
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
