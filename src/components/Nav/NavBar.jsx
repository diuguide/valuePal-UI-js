import { Navbar, Container, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authState, logout } from "../../slice/auth/authSlice";
import Login from "../Auth/Login";

const NavBar = () => {
  const auth = useSelector(authState);
  const dispatch = useDispatch();
  const linkStyle = {
    textDecoration: "none",
    fontSize: "10px",
    margin: "2px",
    color: "lightblue",
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">ValuePal</Navbar.Brand>
        <Nav className="d-flex justify-content-end align-items-center">
          {!auth.isAuthenticated && <Login />}
          {auth.isAuthenticated && (
            <div style={linkStyle}>You are Logged In | </div>
          )}
          {!auth.isAuthenticated && (
            <Link style={linkStyle} to="/register">
              Register
            </Link>
          )}
          <Link style={linkStyle} to="/" onClick={handleLogout}>
            Logout
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
