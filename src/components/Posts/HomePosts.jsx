import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Post from "./Post"
function HomePosts(props) {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
       const fetchPost = async() => {
            const res = await axios.get('/doubt/getAll');  
            setPosts(res.data); 
       }
       fetchPost();
    },[])
 
    
    return (
        <div>
            {posts.map((p) => (
                <Post key={p._id} post={p} />
            ))}
        </div>
    );
}

export default HomePosts;