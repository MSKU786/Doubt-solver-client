import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import Post from "./Post";

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
            const res = await axios.put(`/doubt/escalated/${user._id}`,accepterId)
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
            <Post post={doubt} comment={false}/>
            <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareTop">
              <h4>Answer </h4>
              <input ref={answer} type="text" className="titleBar" />
            </div>
            <button className="shareButton" type="submit">
              Answer
            </button>
          </form>
          <button onClick={handleEscalate}> Escalate</button>
          </>
        )
    }
    return (
        <div>
            <div>
                <h4> {doubtUser?.username} </h4>
            </div>
            <div>
                <h3> {doubt.title} </h3>
            </div>
            <div>{doubt.desc} 
                <button onClick={solveHandler}>Solve</button>
         
                {
                   
                     solveClick && 
                    <AnswerForm />
                }
            </div>
        </div>
    );
}

export default Doubt;