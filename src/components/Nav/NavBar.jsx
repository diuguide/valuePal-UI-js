import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Login from "../Auth/Login";

const NavBar = () => {
  const linkStyle = {
    textDecoration: "none",
    fontSize: "10px",
    margin: "2px",
    color: "lightblue"
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">ValuePal</Navbar.Brand>
        <Nav className="d-flex justify-content-end">
          <Login />
          <div>
            <Link style={linkStyle} to="/register">Register</Link>
          <Link style={linkStyle} to="/logout">Logout</Link>
          </div>
          
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
