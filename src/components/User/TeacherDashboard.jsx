import React, { useEffect, useState } from 'react';
import axios from "axios";

function TeacherDashboard(props) {
    const [teachers, setTeachers]  = useState([]);
    useEffect(() => {
        const fetchteachers = async() => {
            const res = await axios.get('/auth/only/TA');
            setTeachers(res.data);
            console.log(res.data);
        }
        fetchteachers();
    },[])
    return (
        <div>
            <h2>Report of TA</h2>
            <div className="reportContainer">

                <div>
                    {
                        teachers.map((t)=> (
                            <>
                            <h4>{t.username}</h4>
                            <h4>{t.accepted?.length} Accepted</h4>
                            <h5>{t.escalated?.length} Escalted</h5>
                            <h4>{t.accepted?.length- t.escalated?.length} total ANswer</h4>
                            </>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default TeacherDashboard;