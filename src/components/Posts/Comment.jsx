import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./homeposts.css";
import serverId from "../../reducers/api";

function Comment({comment}) {
    const [content, setContent] = useState(null);
    const [userId, setUserId] = useState(null);
    const [commentUser, setCommentUser] = useState(null);
    const authAxios = axios.create({
        baseURL: serverId,
        headers:{
            Authorization: `Bearer ${localStorage.token}`
        }
    })
    
    useEffect(()=> {
        try{
            const fetchComment = async() => {
                const res = await authAxios.get(serverId+"/comment/get/"+comment);
                setContent(res.data.desc);
                setUserId(res.data.userId);
                if(res.data.userId)
                {
                    const fetchUser = async () => {
                        const commenter = await axios.get(serverId+"/auth/user/"+res.data.userId);
                        setCommentUser(commenter.data);
                    }
                    fetchUser();
                }
            }
            fetchComment();
        }catch(err)
        {
            window.alert("Internal server error");
        }
    },[comment]);

   
    return (
        <div className="commentSection">
                <div className="commentTopbar">
                    <span className="userName">{commentUser?.username}:</span>
                    <span className="postDate">{content}</span>
                </div>
        </div>
    );
}

export default Comment;