import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../context/auth";
import Doubt from "../Posts/Doubt";
import axios from "axios";
import "./users.css"

function TeacherAssistance(props) {
    const {user } = useContext(AuthContext);
    const [doubt, setDoubts] = useState([]);

    useEffect(()=> {
        try{
            const fetchPost = async() => {
                console.log(user);
                const res = await axios("/doubt/getRemaining/"+user._id);
                console.log(res);
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