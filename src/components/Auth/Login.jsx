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

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(isLoading());
    loginUser(loginCreds)
      .then((res) => {
        console.log("response login: ", res);
        setloginCreds({
          username: "",
          password: "",
        });
        if (res.status === 200) {
          localStorage.setItem("authorization", res.headers.authorization);
          dispatch(isLoaded(res.headers.authorization));
        }
      })
      .catch((err) => {
        dispatch(showMessage(err.response.data));
        setTimeout(() => {
          dispatch(hideMessage());
        }, 5000);
      });
  };

  const formStyle = {
    input: {
      height: "20px",
      width: "110px",
      margin: "5px",
      fontSize: "10px",
      borderRadius: "10px",
      paddingLeft: "10px"
    },
    button: {
      fontSize: "10px",
      borderRadius: "10px",
    },
  };

  return (
    <Row>
      <Col>
        <Form className="d-flex align-items-center">
          <Form.Group className="">
            <input
              style={formStyle.input}
              type="text"
              name="username"
              value={loginCreds.username}
              onChange={handleChange}
              placeholder="Username"
            ></input>
          </Form.Group>
          <Form.Group className="">
            <input
              style={formStyle.input}
              type="password"
              name="password"
              value={loginCreds.password}
              onChange={handleChange}
              placeholder="Password"
            ></input>
          </Form.Group>
          {error.showMsg && <Alert variant="danger">{error.msg}</Alert>}
          <button style={formStyle.button} onClick={handleClick}>
            Login
          </button>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
