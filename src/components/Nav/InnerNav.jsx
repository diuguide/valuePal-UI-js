import { Nav } from "react-bootstrap";

const InnerNav = ({ page }) => {
  return (
    <Nav >
      <Nav.Item>
        <Nav.Link  onClick={() => page("holding")}>Holdings</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link  onClick={() => page("order")}>Orders</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link  onClick={() => page("analytics")}>Analytics</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default InnerNav;
