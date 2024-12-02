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
    <NavbarRB expand="md" bg="primary" data-bs-theme="dark">
      <Container>
        <NavbarRB.Brand href="#home">Free</NavbarRB.Brand>
        <NavbarRB.Toggle aria-controls="basic-navbar-nav" />
        <NavbarRB.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
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
          <div>
            <Button onClick={fazerLogout}>Sair</Button>
          </div>
        </NavbarRB.Collapse>
      </Container>
    </NavbarRB>
  );
};

export default Navbar;
