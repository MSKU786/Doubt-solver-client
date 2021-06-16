import React from 'react';

import { useContext, useRef} from "react";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import "./users.css"
import serverId from "../../reducers/api";

function Student(props) {
    const { user } = useContext(AuthContext);
    const desc = useRef();
    const title = useRef();
    const submitHandler = async (e) => {
      e.preventDefault();
      const newDoubt = {
        userId: user._id,
        title: title.current.value,
        desc: desc.current.value,
      };
      
      try {
        await axios.post(serverId+"/doubt/create", newDoubt);
        window.location.reload();
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