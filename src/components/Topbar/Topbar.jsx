import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { Link } from "react-router-dom";
import "./topbar.css"
function Topbar(props) {
   
    const {user} = useContext(AuthContext);
    const logoutHandler = () => {
        localStorage.clear();
        window.location.reload();
    }
    const StudentBar = () => {
        return (
            <>
                <div className="topbarContent">
                    <Link to="/">
                        <div className="topbarLeftContent">
                            Home
                        </div>
                    </Link>
                    <Link to="/student">
                        <div className="topbarRightContent">
                            Raise Doubt
                        </div>
                    </Link>
                   
                </div>
            </>
        )
    }

    const TABar = () => {
        return (
            <>
                <div className="topbarContent">
                    <Link to="/">
                        <div className="topbarLeftContent">
                            Home
                        </div>
                    </Link>
                    <Link to="/solve">
                        <div className="topbarRightContent">
                            Solve Doubt
                        </div>
                    </Link>
                </div>
            </>
        )
    }

    const TeacherBar = () => {
        return (
            <>
                <div className="topbarContent">
                    <Link to="/">
                        <div className="topbarLeftContent">
                            Home
                        </div>
                    </Link>
                    <Link to="/dashboard">
                        <div className="topbarRightContent">
                            Dashboard
                        </div>
                    </Link>
                </div>
            </>
        )
    }
    return (
   
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
        
    );
}

export default Topbar;