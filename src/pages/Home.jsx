import React from 'react';

import HomePosts from "../components/Posts/HomePosts"
import Topbar from '../components/Topbar/Topbar';

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