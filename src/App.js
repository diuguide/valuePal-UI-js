import { Container } from "react-bootstrap";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Welcome from "./components/Main/Welcome";
import Main from "./components/Main/Main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./scss/App.scss";
import NavBar from "./components/Nav/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" component={Welcome}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/main" component={Main}></Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
