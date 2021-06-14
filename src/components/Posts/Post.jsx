import React, { useEffect } from 'react';
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import "./homeposts.css";
import Comment from "./Comment"
import { format } from "timeago.js"

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
        <div className="postWrapper">
            <div className="postTopbar">
                <span className="userName">{postUser?.username}</span>
                <span className="postDate">{format(post.createdAt)}</span>
            </div>
            <div className="postTitle">
                <h2>Title</h2>
                {post.title}
            </div >
            <div className="postDescription">
                <h3>Description</h3>
                {post.desc}
            </div>
            <div className = "postComments">
                {post.comments.map((c)=> (
                     <Comment key={c._id} comment={c} />
                ))}
                    { user.usertype==="STUDENT" &&
                    (
                    <>
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
                    </>
                    )}
            </div>
        </div>
    );
}

export default Post;