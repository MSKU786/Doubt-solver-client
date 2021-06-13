import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Post({post}) {
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
        </div>
    );
}

export default Post;