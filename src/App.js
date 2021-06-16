
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateDoubt from "./pages/CreateDoubt";
import SolveDoubt from "./pages/SolveDoubt";
import Dashboard from "./pages/Dashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from "react-router-dom";
import { AuthContext } from "./context/auth";
import { useContext } from "react";



export default function App() {
  const token= localStorage.token ?  true : false;
  const {user} = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          { token ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{token? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {token ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/student">
          {user?.usertype==='STUDENT'? <CreateDoubt /> :  <Redirect to="/" /> } 
        </Route>
        <Route path="/solve">
          {user?.usertype==='TA'? <SolveDoubt /> :  <Redirect to="/" /> }
        </Route>
        <Route path="/dashboard">
          {user?.usertype==='TEACHER'?  <Dashboard />:  <Redirect to="/" /> }
        </Route>
      </Switch>
    </Router>
  );
}