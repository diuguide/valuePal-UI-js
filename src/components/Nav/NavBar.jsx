import { Navbar, Container, Nav } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">ValuePal</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/register">Register</Nav.Link>
          <Nav.Link href="/logout">Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
