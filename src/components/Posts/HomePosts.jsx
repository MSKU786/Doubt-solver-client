import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Post from "./Post"
import "./homeposts.css"
import serverId from "../../reducers/api";
function HomePosts(props) {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
       const fetchPost = async() => {
            const res = await axios.get(serverId+'/doubt/getAll');  
      
            setPosts(
                res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                }));
       }
       fetchPost();
    },[])
 
    
    return (
        <div className="mainContainer">
            {posts.map((p) => (
                <Post key={p._id} post={p} />
            ))}
        </div>
    );
}

export default HomePosts;