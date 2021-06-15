import React, { useEffect } from 'react';
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import "./homeposts.css";
import Comment from "./Comment"
import Answer from "./Answer"
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
            <div className="titleHead">
                <span className="postTitle">
                    {post.title}
                </span>
                <span className="resolvedTag">
                    {post.answer?
                        <b>Resolved</b> :
                        <p>

                        </p> }
                </span>
                
            </div >
            <div className="postDescription">
                {post.desc}
            </div>
            <div className="answerSection">
                {post?.answer?
                        <b><Answer answer={post.answer} /></b> :
                        <b>
                        </b> }
            </div>
            <div className = "postComments">
              
                    { user.usertype==="STUDENT" &&
                    (
                    <>
                      <div className="commentHeading">
                        {post.comments.length} Comment
                        </div>
                        {post.comments.map((c)=> (
                            <Comment key={c._id} comment={c} />
                        ))}
                        <form className="shareComment" onSubmit={commentHandler}>
                            <div className="shareTop">
                                <input
                                    placeholder="Comment " 
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