import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { registerUser } from "../../utilities/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  errorState,
  showMessage,
  hideMessage,
} from "../../slice/error/errorSlice";

const Register = () => {
  const error = useSelector(errorState);
  const dispatch = useDispatch();

  const [registerCreds, setRegisterCreds] = useState({
    username: "",
    password: "",
    firstName: "",
    email: "",
    role: "ROLE_USER",
    watchlist: "AMC,GME,AAPL",
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
          email: "",
          role: "ROLE_USER",
          watchlist: "AMC,GME,AAPL",
        });
      })
      .catch((err) => {
        dispatch(showMessage(err.response.data));
        setTimeout(() => {
          dispatch(hideMessage());
        }, 5000);
      });
  };

  const style = {
    welcome: {
      fontSize: "18px",
      borderBottom: "1px solid black"
    },
    description: {
      fontSize:"12px",
      textAlign: "center"
    }
  };

  return (
    <Row className="d-flex">
      <Col className="col-md-6 col-lg-6 col-sm-9">
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
          {error.showMsg && (
            <Alert className="m-2" variant="danger">
              {error.msg}
            </Alert>
          )}
          <Button className="m-2" onClick={handleClick}>
            Register
          </Button>
        </Form>
      </Col>
      <Col>
        <Row>
          <Col>
            <div className="mt-2" style={style.welcome}>
              Welcome to ValuePal, a virtual trading platform!
            </div>
            <div className="mt-2" style={style.description}>
              If you do not have an account, please sign up! ValuePal is a virtual stock trading platform
              that utilizes real-time stock data. User may Buy, Sell, Explore
              Stocks available in all US markets. ValuePal is a work in
              progress, you can find the repository{" "}
              <span>
                <a
                  href="https://github.com/diuguide/valuePal-UI-js"
                  target="_blank"
                >
                  here
                </a>
              </span>{" "}
              for the front end UI, and{" "}
              <span>
                <a
                  href="https://github.com/diuguide/valuePal-java"
                  target="blank"
                >
                  here
                </a>
              </span>
              {" "}for the backend. Any and all contributions are welcome!
            </div>
            <div className="mt-2" style={style.description}>
              In ValuePal, we do not use real money, if you run out of money...just make another account.
              In future developement, there will be a central bank and other features similiar to a real stock market!
              Please leave a message with the application via Github if you interested in helping out or find a bug.  
              Hope you make tons of fake money!
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Register;
