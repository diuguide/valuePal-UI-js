import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { loginUser } from "../../utilities/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  errorState,
  showMessage,
  hideMessage,
} from "../../slice/error/errorSlice";
import { isLoading, isLoaded } from "../../slice/auth/authSlice";
import { useState } from "react";
import { useHistory } from "react-router";

const Login = () => {
  const history = useHistory();
  const error = useSelector(errorState);
  const dispatch = useDispatch();

  const [loginCreds, setloginCreds] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setloginCreds({ ...loginCreds, [name]: value });
  };

  const handleClick = () => {
    dispatch(isLoading());
    loginUser(loginCreds)
      .then((res) => {
        setloginCreds({
          username: "",
          password: "",
        });
        if (res.status === 200) {
          dispatch(isLoaded(res.headers.authorization));
          history.push("/main");
        }
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
              name="username"
              value={loginCreds.username}
              onChange={handleChange}
              placeholder="Username"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="m-2">
            <Form.Control
              type="password"
              name="password"
              value={loginCreds.password}
              onChange={handleChange}
              placeholder="Password"
            ></Form.Control>
          </Form.Group>
          {error.showMsg && (
            <Alert className="m-2" variant="danger">
              {error.msg}
            </Alert>
          )}
          <Button className="m-2" onClick={handleClick}>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
