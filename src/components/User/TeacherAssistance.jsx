import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../context/auth";
import Doubt from "../Posts/Doubt";
import axios from "axios";
import serverId from "../../reducers/api";
import "./users.css"

function TeacherAssistance(props) {
    const {user } = useContext(AuthContext);
    const [doubt, setDoubts] = useState([]);
    const authAxios = axios.create({
        baseURL: serverId,
        headers:{
            Authorization: `Bearer ${localStorage.token}`
        }
    })
    
    useEffect(()=> {
        try{
            const fetchPost = async() => {         
                const res = await authAxios(`${serverId}/doubt/getRemaining/${user._id}`);
                setDoubts(res.data);
            }
            fetchPost();
        }catch(err){
            window.alert("Internal Server Error");
        }
        
    },[user._id])
    return (
        <div className = "solveDoubtContainer">
           <div className="solveDoubtPost">
                {
                    doubt.map((d) => (
                        <Doubt key={d._id} doubt={d}></Doubt>
                    ))
                }
           </div>
                
           
        </div>
    );
}

export default TeacherAssistance;