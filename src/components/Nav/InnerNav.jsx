import { Nav } from "react-bootstrap";

const InnerNav = () => {
  return (
    <Nav variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link>Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>Option 2</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>Disabled</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default InnerNav;
