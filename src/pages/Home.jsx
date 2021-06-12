import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import Topbar from '../components/Topbar/Topbar';
function Home(props) 
{
    const {user} = useContext(AuthContext);
    return (
        <div>
            <Topbar user={user}/>
            
        </div>
    );
}

export default Home;