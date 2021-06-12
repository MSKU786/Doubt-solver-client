import { useEffect } from "react";

  
const AuthReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_START":
        return {
          user: null,
          isFetching: true,
          error: false,
        };
      case "LOGIN_SUCCESS":
        // let decode = null;
        // if(localStorage.token)
        // {
        //     decode = jwt_decode(localStorage.token);
            
        // }
        // useEffect(()=>{
        //     const fetchUser  = async () => {
        //         const res = await axios.get(`https://backendwhistler.herokuapp.com/api/users?userID=${decode?.id}`)
        //     }
        //     fetchUser();    
        // },[]);
        console.log(action.payload);
        return {
          user: action.payload,
          isFetching: false,
          error: false,
        };
      case "LOGIN_FAILURE":
        return {
          user: null,
          isFetching: false,
          error: true,
        };
      default:
        return state;
    }
  };
  
  export default AuthReducer;