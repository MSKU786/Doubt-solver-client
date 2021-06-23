import React from 'react';

import { useContext, useRef} from "react";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import "./users.css"
import serverId from "../../reducers/api";
import { useHistory } from 'react-router-dom';

function Student(props) {
    const { user } = useContext(AuthContext);
    const history = useHistory();
    const desc = useRef();
    const title = useRef();
    const authAxios = axios.create({
      baseURL: serverId,
      headers:{
          Authorization: `Bearer ${localStorage.token}`
      }
  })
  
    const submitHandler = async (e) => {
      e.preventDefault();
      const newDoubt = {
        userId: user._id,
        title: title.current.value,
        desc: desc.current.value,
      };
      
      try {
        const res = await authAxios.post(`${serverId}/doubt/create`, newDoubt);
        history.push("/");
      } catch (err) {
        window.alert("Internal Sever Error")
      }
    };
  
    return (
      <div className="share">
        <div className="shareWrapper">
          
          
          <form className="shareForm" onSubmit={submitHandler}>
            <div className="shareTop">
              <h4> Title </h4>
              <input ref={title} 

                type="text" className="titleBar" />
              <h4> Description</h4>
              <textarea
                placeholder={"What's your doubt " + user.username + "?"}
                className="shareInput"
                ref={desc}
              />
            </div>
            <button className="shareButton" type="submit">
              Share
            </button>
          </form>
        </div>
      </div>
    );
}

export default Student;
