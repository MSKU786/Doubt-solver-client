import { useContext, useRef } from "react";
//import "./login.css";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../context/auth";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login"
import "./login.css"
import axios from "axios";

export default function Login() {
const email = useRef();
const password = useRef();
const history = useHistory();
const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
 
    
  };

  const responseSuccessGoogle = (res) => {
      console.log(res);
  
  }

  const responseFailureGoogle = async(res) => {
      console.log("failure", res);
      const backend = await axios.post("/auth/googleLogin", {tokenId : res.tokenId });
      console.log("this is backedn",backend);
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Mr Solver :)</h3>
          <span className="loginDesc">
            Welcome let's solve your doubt
          </span>
        </div>
        <div className="loginRight">
          <form className="signupBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <Link to="/"> 
              <button className="loginRegisterButton">
                {isFetching ? (
                  <CircularProgress color="white" size="20px" />
                ) : (
                  "Create a New Account"
                )}
              </button>
            </Link>
            
          </form>
          <h2>Login Via Google</h2>
            <GoogleLogin
              clientId="363086331701-j72med5b4r7l2ed4059lhohudv4ggp9i.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseSuccessGoogle}
              onFailure={responseFailureGoogle}
              cookiePolicy={'single_host_origin'}
            />
        </div>
      </div>
    </div>
  );
}