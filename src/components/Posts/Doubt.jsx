import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import Post from "./Post";

function Doubt({doubt}) {
    const {user} = useContext(AuthContext);
    const [doubtUser, setDoubtUser] = useState(null);
    const [solveClick, setSolveClick] = useState(false);
    const [escalate, setEscalate] = useState(false);
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
                console.log(solveClick);
                console.log(res);
                
            }
        }catch(err)
        {
            console.log(err);
        }
    }
    const submitHandler = async(e) => {
        e.preventDefault();
        const newAns = {
            userId : user._id,
            desc : answer.current.value,
            isAnswer: true
        }
        try{
            const res = await axios.post(`/comment/create/${doubt._id}`, newAns)
            console.log(res);
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }
    const AnswerForm = () => {
        return (
            <>
            <Post post={doubt}/>
            <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareTop">
              <h4>Answer </h4>
              <input ref={answer} type="text" className="titleBar" />
            </div>
            <button className="shareButton" type="submit">
              Answer
            </button>
          </form>
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