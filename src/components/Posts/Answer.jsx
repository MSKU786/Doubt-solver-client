import { format } from "timeago.js"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import serverId from "../../reducers/api";

function Answer({answer}) {
    const [content, setContent] = useState(null);
    const [userId, setUserId] = useState(null);
    const [time, setTime] = useState(null);
    const [commentUser, setCommentUser] = useState(null);
    useEffect(()=> {
        try{
            const fetchComment = async() => {
                const res = await axios.get(serverId+"/comment/get/"+answer);
                setContent(res.data.desc);
                setUserId(res.data.userId);
                setTime(res.data.createdAt);
                
                if(res.data.userId)
                {
                    const fetchUser = async () => {
                        const commenter = await axios.get(serverId+"/auth/user/"+res.data.userId);
                        console.log(commenter.data);
                       setCommentUser(commenter.data.username);
                    }
                    fetchUser();
                }
            }
            fetchComment();
        }catch(err)
        {
            console.log(err);
            window.alert("Internal server error");
        }
    },[answer]);
    return (
        <div className="answerContainer">
            
            <div className="answerTop">
                <div className="answerTopName"> {commentUser}</div >
                <div className="answerTopTime">{format(time)}</div >
            </div>
            <div className="answerContent">
            <h3>Answer :</h3>
                    {content}
            </div>
        </div>
    );
}

export default Answer;