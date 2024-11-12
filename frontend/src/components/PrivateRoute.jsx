import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Navbar from './Navbar';
import { Spinner } from 'react-bootstrap';

const PrivateRoute = ({ children, roles = ['cliente', 'desenvolvedor'] }) => {
  const { user } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!user) {
      const timeoutId = setTimeout(() => {
        setRedirect(true);
      }, 2000);

      // Limpar o timeout quando o componente desmontar
      return () => clearTimeout(timeoutId);
    }
  }, [user]);

  const temPermissao = user && roles.includes(user.role);

  if (redirect) {
    return <Navigate to="/login" />;
  }
  if (!redirect && !user) {
    return (
      <div
        style={{ height: '100vh' }}
        className="d-flex justify-content-center align-items-center"
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (user && !temPermissao) {
    return <Navigate to="/" />;
  }

  return (
    user &&
    temPermissao && (
      <>
        <Navbar role={user.role} />
        {children}
      </>
    )
  );
};

export default PrivateRoute;
