import React, { useEffect, useState } from 'react';
import axios from "axios";

function TeacherDashboard(props) {
    const [teachers, setTeachers]  = useState([]);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchteachers = async() => {
            const res = await axios.get('/auth/only/TA');
            setTeachers(res.data);
            
       
        }
        fetchteachers();
        const fetchPost = async() => {
            const res = await axios.get('/doubt/getAll');  
            setPosts(res.data); 
           // totalDoubt = res.data.length;
            
       }
       fetchPost();
    },[])
   
   

    const TeacherActitvity = ({ta}) => {
            let totalEscalated = 0;
            let totalAccepted = 0;
            let totalAverageTime = 0;
            ta.map((t)=> (
                totalEscalated+=t.escalated.length
            ))

            ta.map((t)=> (
                totalAccepted+=t.accepted.length
            ))

            ta.map((t)=>(
       
                
                t.answerTime.length!==0 && (totalAverageTime+=(t.answerTime?.reduce((a,b) => {
                    return parseFloat(a) + parseFloat(b)
                }))/t.answerTime.length
               
            )))
            return (
                <div className="averageContainer">
                    <div className="averageNo">
                            {posts.length}
                    </div>
                
                    <div className="averageNo">
                            {totalEscalated}
                    </div>
                    <div className="averageNo">
                            {totalAccepted-totalEscalated}
                    </div>
                    <div className="averageNo">
                            {totalAverageTime/(totalAccepted-totalEscalated)}sec
                    </div>
                </div>
            )
    }

    const TimeCalculate = ({time}) => {
            let total =0;
            time.map((t)=> (
                total+=parseFloat(t)
            ))
            total = total/(time.length==0? 1: time.length);
            return (
                <span className="listItem"> {total} &nbsp; Average Doubt Activity Time</span>
            )
    }

 
    return (
        <div className = "solveDoubtContainer">
            <div className="teacherContainer">
                <TeacherActitvity ta={teachers} />
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