import React, { useEffect, useState } from 'react';
import axios from "axios";
import serverId from "../../reducers/api";
function TeacherDashboard(props) {
    const [teachers, setTeachers]  = useState([]);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        try{
            const fetchteachers = async() => {
                const res = await axios.get(serverId+'/auth/only/TA');
                setTeachers(res.data);
                
           
            }
            fetchteachers();
            const fetchPost = async() => {
                const res = await axios.get(serverId+'/doubt/getAll');  
                setPosts(res.data); 
               // totalDoubt = res.data.length;
                
           }
           fetchPost();
        }catch(err){
            window.alert("Internal Server Error");
        }
      
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
                        <h1>
                        {posts.length}
                        </h1>
                            
                            <h3>Doubts Asked</h3>
                    </div>
                
                    <div className="averageNo">
                        <h1>{totalEscalated}</h1>
                            
                            <h3>Doubts Escalated</h3>
                    </div>
                    <div className="averageNo">
                            <h1>
                            {totalAccepted-totalEscalated}
                            </h1>
                            <h3>Doubts Resolved</h3>
                    </div>
                    <div className="averageNo">
                        <h1>
                        {totalAverageTime/(totalAccepted-totalEscalated)}sec
                        </h1>
                           
                            <h3>Avg. Doubt Resolution Time</h3>
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