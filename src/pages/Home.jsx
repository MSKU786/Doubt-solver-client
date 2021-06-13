import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import HomePosts from "../components/Posts/HomePosts"
import Topbar from '../components/Topbar/Topbar';
import Student from '../components/User/Student';
function Home(props) 
{
    return (
        <div>
            <Topbar />
            <HomePosts />

        </div>
    );
}

export default Home;