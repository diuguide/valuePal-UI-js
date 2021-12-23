import { Navbar, Container, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authState, logout } from "../../slice/auth/authSlice";
import { walletState } from "../../slice/wallet/walletSlice";
import Login from "../Auth/Login";

const NavBar = () => {
  const auth = useSelector(authState);
  const wallet = useSelector(walletState);
  const dispatch = useDispatch();
  const linkStyle = {
    textDecoration: "none",
    fontSize: "10px",
    margin: "2px",
    color: "lightblue",
    username: {
      color: 'white',
      marginRight: '10px'
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authorization");
    dispatch(logout());
    window.location.reload();
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">ValuePal</Navbar.Brand>
        <Nav className="d-flex justify-content-end align-items-center">
          {auth.isAuthenticated && <div style={linkStyle.username}>{wallet.user.username}</div>}
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
