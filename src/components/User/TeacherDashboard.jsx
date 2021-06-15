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
        <div className = "solveDoubtContainer">
            <div className="teacherContainer">
                <div className="averageContainer">
                    <div className="averageNo">

                    </div>
                    <div className="averageNo">

                    </div>
                    <div className="averageNo">

                    </div>
                    <div className="averageNo">

                    </div>
                </div>
                <h2>Report of TA</h2>
                <div className="reportContainer">

                    <div className = "reportList">
                        {
                            teachers.map((t)=> (
                                <>
                                <span className="listItem">{t.username}</span>
                                <span className="listItem">{t.accepted?.length} Accepted</span>
                                <span className="listItem">{t.escalated?.length} Escalted</span>
                                <span>{t.accepted?.length- t.escalated?.length} total ANswer</span>
                                </>
                            ))
                        }
                    </div>
                </div>
            
            </div>
            
        </div>
    );
}

export default TeacherDashboard;