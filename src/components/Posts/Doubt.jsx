import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import Post from "./Post";
import "./homeposts.css"
import { format } from "timeago.js";


function Doubt({doubt}) {
    const {user} = useContext(AuthContext);
    const [doubtUser, setDoubtUser] = useState(null);
    const [solveClick, setSolveClick] = useState(false);
    let solveTime = Date.now();
    const answer  = useRef();
    
    useEffect(() => {
        const fetchUser = async() => {
            const res = await axios.get("/auth/user/"+doubt?.userId);
            setDoubtUser(res.data);
        }
        fetchUser();
    },[doubt?.userId]);

    const solveHandler = async() => {
        try{
            if(solveClick===false)
            {
                let accepterId = {
                    id : doubt._id
                }
                setSolveClick(!solveClick);
                const res = await axios.put(`/doubt/accepted/${user._id}`,accepterId)
                solveTime = Date.now();
                console.log(solveClick);
                console.log(res);
                
            }
        }catch(err)
        {
            console.log(err);
        }
    }

    const handleEscalate = async() => {
        try{
            let accepterId = {
                id : doubt._id
            }
            setSolveClick(!solveClick);
            const res = await axios.put(`/doubt/escalated/${user._id}`,accepterId);
            window.location.reload();
        }catch(err)
        {
            console.log(err);
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
            const res = await axios.post(`/comment/create/${doubt._id}`, newAns);
            
            window.location.reload();
        }catch(err){
            console.log(err);
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