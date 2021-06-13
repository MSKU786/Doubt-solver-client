
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateDoubt from "./pages/CreateDoubt";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";


export default function App() {
  const user = localStorage.token ? false : true;
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {!user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{!user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {!user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/student">
          { <CreateDoubt />}
        </Route>
      </Switch>
    </Router>
  );
}