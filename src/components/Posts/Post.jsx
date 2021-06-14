import React, { useEffect } from 'react';
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/auth";
import axios from "axios";


import Comment from "./Comment"

function Post({post}) {
    const { user } = useContext(AuthContext);
    //console.log("this is a comment", comment);
    const desc = useRef();
    const commentHandler = async (e) => {
      e.preventDefault();
      const newComment = {
        userId: user._id,
        desc: desc.current.value,
        isAnswer: false
      };
      
      try {
        //console.log(newComment);
        const res = await axios.post(`/comment/create/${post._id}`, newComment);
        console.log(res);
        window.location.reload();
      } catch (err) {}
    };
    const [postUser, setPostUser] = useState(null);
    useEffect(() => {
        const fetchUser = async() => {
            const res = await axios.get("/auth/user/"+post?.userId);
            setPostUser(res.data);
        }
        fetchUser();
    },[post?.userId]);



    return (
        <div>
            <div>
                {postUser?.username}
            </div>
            <div>
                {post.title}
            </div>
            <div>{post.desc}</div>
            <div>
                {post.comments.map((c)=> (
                     <Comment key={c._id} comment={c} />
                ))}
                    <h5>
                        Comments
                    </h5>
                    <form className="shareBottom" onSubmit={commentHandler}>
                        <div className="shareTop">

                        <h4> Description</h4>
                        <input
                            placeholder="What's your comment " 
                            className="shareInput"
                            ref={desc}
                        />
                        </div>
                        <button className="shareButton" type="submit">
                        Comment
                        </button>
                    </form>
                <h2>----------------------</h2>
            </div>
        </div>
    );
}

export default Post;