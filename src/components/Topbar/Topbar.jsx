import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { Link } from "react-router-dom";
function Topbar(props) {
   
    const {user} = useContext(AuthContext);
    const logoutHandler = () => {
        localStorage.clear();
        window.location.reload();
    }
    const StudentBar = () => {
        return (
            <>
                <ul>
                    <Link to="/">
                        <li>
                            Home
                        </li>
                    </Link>
                    <Link to="/student">
                        <li > 
                            Raise Doubt
                        </li>
                    </Link>
                   
                </ul>
            </>
        )
    }

    const TABar = () => {
        return (
            <>
                <ul>
                    <Link to="/">
                        <li>
                            Home
                        </li>
                    </Link>
                    <Link to="/solve">
                        <li>
                            Solve Doubt
                        </li>
                    </Link>
                </ul>
            </>
        )
    }

    const TeacherBar = () => {
        return (
            <>
                <ul>
                    <li>
                        Home
                    </li>
                    <li>
                        Dashboard
                    </li>
                </ul>
            </>
        )
    }
    return (
        <div>
            <div className="topContainer">
                <div className="leftSide">
                    <div className="leftSideLogo">
                        Coding Ninja
                    </div>
                    <div className="leftSideList">
                        {(() => {
                            switch(user.usertype)
                            {
                                case "STUDENT" : return <StudentBar />;
                                case "TEACHER" : return <TeacherBar />;
                                case "TA" : return <TABar />;
                            }
                        }
                        )()
                        }
                    </div>
                </div>
                <div className="rightSide">
                        <button className="topLogout" onClick={logoutHandler}>
                            Logout
                        </button>
                </div>
            </div>
        </div>
    );
}

export default Topbar;