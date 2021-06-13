import React from 'react';
import {
    PermMedia,
    Label,
    Room,
    EmojiEmotions,
    Cancel,
  } from "@material-ui/icons";
  import { useContext, useRef, useState } from "react";
  import { AuthContext } from "../../context/auth";
  import axios from "axios";


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
        console.log(newDoubt);
        await axios.post("/doubt/create", newDoubt);
        window.location.reload();
      } catch (err) {}
    };
  
    return (
      <div className="share">
        <div className="shareWrapper">
          
          <hr className="shareHr" />
          <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareTop">
              <h4> Title </h4>
              <input ref={title} type="text" className="titleBar" />
              <h4> Description</h4>
              <input
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