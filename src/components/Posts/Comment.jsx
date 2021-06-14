import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./homeposts.css";
import { format } from "timeago.js"

function Comment({comment}) {
    const [content, setContent] = useState(null);
    const [userId, setUserId] = useState(null);
    const [commentUser, setCommentUser] = useState(null);
    useEffect(()=> {
        try{
            const fetchComment = async() => {
                const res = await axios.get("/comment/get/"+comment);
                setContent(res.data.desc);
                setUserId(res.data.userId);
                if(res.data.userId)
                {
                    const fetchUser = async () => {
                        const commenter = await axios.get("/auth/user/"+res.data.userId);
                        setCommentUser(commenter.data);
                    }
                    fetchUser();
                }
            }
            fetchComment();
        }catch(err)
        {
            console.log(err);
        }
    },[comment._id]);

   
    return (
        <div className="commentSection">
                <div className="commentTopbar">
                    <span className="userName">{commentUser?.username}</span>
                    <span className="postDate">{format(comment.createdAt)}</span>
                </div>

                <div className="commentMain">
                    {
                        content
                    }
                </div>
        </div>
    );
}

export default Comment;