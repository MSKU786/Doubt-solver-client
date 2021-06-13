import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../context/auth";
import Doubt from "../Posts/Doubt";
import axios from "axios";
function TeacherAssistance(props) {
    const {user } = useContext(AuthContext);
    const [doubt, setDoubts] = useState([]);

    useEffect(()=> {
        const fetchPost = async() => {
            console.log(user);
            const res = await axios("/doubt/getRemaining/"+user._id);
            console.log(res);
            setDoubts(res.data);
        }
        fetchPost();
    },[user._id])
    return (
        <div>
            <div>
                {
                    doubt.map((d) => (
                        <Doubt key={d._id} doubt={d}></Doubt>
                    ))
                }
            </div>
            <div>

            </div>
        </div>
    );
}

export default TeacherAssistance;