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
      } catch (err) {
            window.alert("Internal Server Error");
      }
    };
    const [postUser, setPostUser] = useState(null);
    useEffect(() => {
        try{
            const fetchUser = async() => {
                const res = await axios.get("/auth/user/"+post?.userId);
                setPostUser(res.data);
            }
            fetchUser();
        }catch(err){
            window.alert("Internal Server Error");
        }
        
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
              
                    
                      <div className="commentHeading">
                        {post.comments.length} &nbsp; Comment
                        </div>
                        {post.comments.map((c)=> (
                            <Comment key={c._id} comment={c} />
                        ))}
                        { user.usertype==="STUDENT" &&
                        (
                        <>
                        <form className="shareComment" onSubmit={commentHandler}>
                            <div className="shareTop">
                                <input
                                    placeholder="Comment " 
                                    className="shareCommentInput"
                                    ref={desc}
                                />
                            </div>
                            <button type="submit" className="shareCommentButton">
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