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

    const TimeCalculate = ({time}) => {
            let total =0;
            time.map((t)=> (
                total+=parseFloat(t)
            ))
            return (
                <span className="listItem"> {total} &nbsp; Average Doubt Activity Time</span>
            )
    }
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

                   <ul className = "unorderList">
                        {
                            teachers.map((t)=> (
                                <li className = "reportList">
                                    <div className="name">
                                        <h4>{t.username}</h4>
                                    </div>
                                        
                                    <div className="reportName"> 
                                        <span className="listItem">{t.accepted?.length} &nbsp; Doubts Accepted</span>
                                        <span className="listItem">{t.escalated?.length} &nbsp; Doubts Escalted</span>
                             
                                        <span className="listItem">{t.accepted?.length- t.escalated?.length} &nbsp; Doubts Answered</span>
                                        <TimeCalculate time = {t.answerTime}/>
                                        
                                    </div>
                               
                                </li>
                            ))
                        }
                    </ul>
                </div>
            
            </div>
            
        </div>
    );
}

export default TeacherDashboard;