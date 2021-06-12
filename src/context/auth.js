import { createContext, useEffect, useReducer, useState } from "react";
import AuthReducer from "../reducers/auth";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  let currentUser = null;

  // useEffect(()=>{
  //   localStorage.setItem("user", JSON.stringify(state.user))
  // },[state.user])

  if(state.user!=null)
    currentUser = state.user
  return (
    <AuthContext.Provider
      value={{
        user: state.user|| currentUser,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};