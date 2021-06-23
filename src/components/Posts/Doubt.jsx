import { useContext, useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import serverId from "../../reducers/api";
import "./homeposts.css"
import { format } from "timeago.js";


function Doubt({doubt}) {
    let history = useHistory();
    const {user} = useContext(AuthContext);
    const [doubtUser, setDoubtUser] = useState(null);
    const [solveClick, setSolveClick] = useState(false);
    let solveTime = Date.now();
    const answer  = useRef();
    const authAxios = axios.create({
        baseURL: serverId,
        headers:{
            Authorization: `Bearer ${localStorage.token}`
        }
    })
    
    useEffect(() => {
        try{
            const fetchUser = async() => {
                const res = await authAxios.get(`${serverId}/auth/user/${doubt?.userId}`);
                setDoubtUser(res.data);
            }
            fetchUser();
        }catch(err){
            window.alert("Internal server error");
        }
    },[doubt?.userId]);

    const solveHandler = async() => {
        try{
            if(solveClick===false)
            {
                let accepterId = {
                    id : doubt._id
                }
                setSolveClick(!solveClick);
                const res = await authAxios.put(`${serverId}/doubt/accepted/${user._id}`,accepterId)
                solveTime = Date.now();
                
            }
        }catch(err)
        {
            console.log(err);
            window.alert("Internal server error");
        }
    }

    const handleEscalate = async() => {
        try{
            let accepterId = {
                id : doubt._id
            }
            setSolveClick(!solveClick);
            const res = await authAxios.put(`${serverId}/doubt/escalated/${user._id}`,accepterId);
            history.push('/');
        }catch(err)
        {
            console.log(err);
            window.alert("Internal server error");
        }
    }
    const submitHandler = async(e) => {
        e.preventDefault();
        let stringTime = ((Date.now()-solveTime)/1000).toString();
        console.log(solveTime);
          
        const newAns = {
            userId : user._id,
            desc : answer.current.value,
            isAnswer: true,
            time: stringTime
        }
        try{
            const res = await authAxios.post(`${serverId}/comment/create/${doubt._id}`, newAns);
            history.push('/');
        }catch(err){
            console.log(err);
            window.alert("Internal server error");
        }
    }
    const AnswerForm = () => {
        return (
            <>
            <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareTop">
              <h4>Answer </h4>
              <input ref={answer} type="text" className="titleBar" />
            </div>
            <button className="shareButton" type="submit">
              Answer
            </button>
          </form>
          <button className="escalateButton" onClick={handleEscalate}> Escalate</button>
          </>
        )
    }
    return (
        <div className="doubtContainer">
            <div className="postTopbar">
                <span className="userName"> {doubtUser?.username} </span>
                <span className="postDate">{format(doubt.createdAt)}</span>
            </div>
            <div className="postTitle">
                <p> {doubt.title} </p>
            </div>
            <div className="postDescription">{doubt.desc} 
                <button className="answerSolve" onClick={solveHandler}>Solve</button>
                {
                   
                     solveClick && 
                    <AnswerForm />
                }
            </div>
        </div>
    );
}

export default Doubt;