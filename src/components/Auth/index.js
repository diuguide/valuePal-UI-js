import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { registerUser } from "../../utilities/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorState, showMessage, hideMessage } from "../../slice/error/errorSlice";

const Register = () => {

  const error = useSelector(errorState);
  const dispatch = useDispatch();

  const [registerCreds, setRegisterCreds] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterCreds({ ...registerCreds, [name]: value });
  };

  const handleClick = () => {
    registerUser(registerCreds)
      .then((res) => {
        setRegisterCreds({
          username: "",
          password: "",
          firstName: "",
          lastName: "",
          email: "",
        });
      })
      .catch((err) => {
        dispatch(showMessage(err.response.data));
        setTimeout(() => {
          dispatch(hideMessage());
        }, 5000);
      });
  };

  return (
    <Row>
      <Col>
        <Form>
          <Form.Group className="m-2">
            <Form.Control
              type="text"
              name="firstName"
              value={registerCreds.firstName}
              onChange={handleChange}
              placeholder="First Name"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="m-2">
            <Form.Control
              type="text"
              name="lastName"
              value={registerCreds.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="m-2">
            <Form.Control
              type="text"
              name="email"
              value={registerCreds.email}
              onChange={handleChange}
              placeholder="Email"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="m-2">
            <Form.Control
              type="text"
              name="username"
              value={registerCreds.username}
              onChange={handleChange}
              placeholder="Username"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="m-2">
            <Form.Control
              type="password"
              name="password"
              value={registerCreds.password}
              onChange={handleChange}
              placeholder="Password"
            ></Form.Control>
          </Form.Group>
          {error.showMsg &&
          <Alert className="m-2" variant="danger">{error.msg}</Alert>
          }
          <Button className="m-2" onClick={handleClick}>
            Register
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Register;
