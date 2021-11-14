import { Container } from "react-bootstrap";
import Register from "./components/Auth/index";
import Login from "./components/Auth/Login";
import Welcome from "./components/Main/Welcome";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./scss/App.scss";
import NavBar from "./components/Nav/NavBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { isLoaded } from "./slice/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.getItem('authorization')) {
      dispatch(isLoaded(localStorage.getItem("authorization")));
    }
  });
  return (
    <Router>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" ><Welcome /></Route>
          <Route path="/login" ><Login /></Route>
          <Route path="/register" ><Register /></Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
