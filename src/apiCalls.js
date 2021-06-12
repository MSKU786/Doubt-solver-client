  
import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/login", userCredential);
    localStorage.setItem('token', res.data.token);
    dispatch({ type: "LOGIN_SUCCESS", payload: JSON.stringify(res.data.user)});
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};