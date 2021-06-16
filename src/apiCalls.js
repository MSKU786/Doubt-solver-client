  
import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("https://doubtsolverbackend.herokuapp.com/api/auth/login", userCredential);
    localStorage.setItem('token', res.data.token);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user});
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
    window.alert("Email or Password doesn't match")
  }
};


const serverId = "https://doubtsolverbackend.herokuapp.com/api"
export default serverId