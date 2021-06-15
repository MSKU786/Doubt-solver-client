import { format } from "timeago.js"
import axios from 'axios';
import React, { useEffect, useState } from 'react';


function Answer({answer}) {
    const [content, setContent] = useState(null);
    const [userId, setUserId] = useState(null);
    //const [time, setTime] = useState(null);
    const [commentUser, setCommentUser] = useState(null);
    useEffect(()=> {
        try{
            const fetchComment = async() => {
                const res = await axios.get("/comment/get/"+answer);
                // setContent(res.data.desc);
                // setUserId(res.data.userId);
                console.log(res.data);
                //setTime(res.data.createdAt);
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
    },[answer]);
    return (
        <div className="answerContainer">
            <div>
                <span> {commentUser}</span>
                <span></span>
            </div>
            <div className="answerContent">
                <b>Answer</b>
                    {content}
            </div>
        </div>
    );
}

export default Answer;