import React from 'react';

function Topbar({user}) {

    const StudentBar = () => {
        return (
            <>
                <ul>
                    <li>
                        Home
                    </li>
                    <li>
                        Raise Doubt
                    </li>
                </ul>
            </>
        )
    }

    const TABar = () => {
        return (
            <>
                <ul>
                    <li>
                        Home
                    </li>
                    <li>
                        Raise Doubt
                    </li>
                    <li>
                        Solve Doubt
                    </li>
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
                        Raise Doubt
                    </li>
                    <li>
                        Solve Doubt
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
                        {() => {
                            switch(user.usertype)
                            {
                                case "STUDENT" : return <StudentBar />;
                                case "TEACHER" : return <TeacherBar />;
                                case "TA" : return <TABar />;
                            }
                        }

                        }
                    </div>
                </div>
                <div className="rightSide">

                </div>
            </div>
        </div>
    );
}

export default Topbar;