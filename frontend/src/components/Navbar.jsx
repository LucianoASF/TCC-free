import { useContext } from 'react';
import { Button, Container, Nav, Navbar as NavbarRB } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Navbar = ({ role = null }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const fazerLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <NavbarRB bg="primary" data-bs-theme="dark">
      <Container>
        <div className="d-flex justify-content-between">
          <NavbarRB.Brand href="#home">Free</NavbarRB.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/seus-pedidos-softwares">
              Seus Pedidos de Softwares
            </Nav.Link>
            {role === 'desenvolvedor' && (
              <>
                <Nav.Link as={Link} to="/pedidos-softwares">
                  Pedidos de Softwares
                </Nav.Link>
                <Nav.Link as={Link} to="/times">
                  Times
                </Nav.Link>
              </>
            )}
          </Nav>
        </div>
        <div>
          <Button onClick={fazerLogout}>Sair</Button>
        </div>
      </Container>
    </NavbarRB>
  );
};

export default Navbar;
