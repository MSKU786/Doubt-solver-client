import { createContext, useEffect, useReducer, useState } from "react";
import AuthReducer from "../reducers/auth";

import jwt_decode from "jwt-decode";
import axios from "axios";

const INITIAL_STATE = {
  user: null ,
  isFetching: false,
  error: false,
};


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const [ user, setUser ] = useState({});
  let decode = null;
  if(localStorage.token)
  {
      decode = jwt_decode(localStorage.token);
      
  }
  useEffect(()=>{
      const fetchUser  = async () => {
          const res = await axios.get(`https://doubtsolverbackend.herokuapp.com/api/auth/user/${decode?.id}`)
          setUser(res.data);
      }
      fetchUser();    
  },[]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user || user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};