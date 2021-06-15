import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { Link } from "react-router-dom";
import AdbIcon from '@material-ui/icons/Adb';
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
                    <Link to="/" style={{color:"white"}}>
                        <div className="topbarLeftContent">
                            Home
                        </div>
                    </Link>
                    <Link to="/student" style={{color:"white"}}>
                        <div className="topbarRightContent" style={{color:"white"}}>
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
                    <Link to="/" style={{color:"white"}}>
                        <div className="topbarLeftContent">
                            Home
                        </div>
                    </Link>
                    <Link to="/solve" style={{color:"white"}}>
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
                <div className="topbarContent" style={{color:"white"}}>
                    <Link to="/">
                        <div className="topbarLeftContent">
                            Home
                        </div>
                    </Link>
                    <Link to="/dashboard" style={{color:"white"}}>
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
                        <AdbIcon className="logo"/>
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