import { Container } from "react-bootstrap";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Welcome from "./components/Main/Welcome";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./scss/App.scss";
import NavBar from "./components/Nav/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" ><Welcome /></Route>
          <Route exact path="/login" ><Login /></Route>
          <Route exact path="/register" ><Register /></Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
