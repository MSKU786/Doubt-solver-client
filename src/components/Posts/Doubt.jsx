import { useContext, useRef, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth";
import axios from "axios";

function Doubt({doubt}) {
    const {user} = useContext(AuthContext);
    const [doubtUser, setDoubtUser] = useState(null);
    const [solveClick, setSolveClick] = useState(false);
    const [escalate, setEscalate] = useState(false);
    const answer  = userRef();
    useEffect(() => {
        const fetchUser = async() => {
            const res = await axios.get("/auth/user/"+doubt?.userId);
            setDoubtUser(res.data);
        }
        fetchUser();
    },[doubt?.userId]);

    const submitHandler(()=> {
        e.preventDefault();
    })
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
                <button onClick={()=>setSolveClick(!solveClick)}>Solve</button>
                { solveClick && 
                    <AnswerForm />
                }
            </div>
        </div>
    );
}

export default Doubt;