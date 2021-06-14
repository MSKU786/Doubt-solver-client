import axios from 'axios';
import React, { useEffect, useState } from 'react';


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
                        console.log(commenter);
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
        <div>
                <h4>---</h4>
                <h2>{commentUser?.username}</h2>
                <h4>-------</h4>
                <div>
                    {
                        content
                    }
                </div>
        </div>
    );
}

export default Comment;