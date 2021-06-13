import React from 'react';
import Topbar from '../components/Topbar/Topbar';
import TeacherDashBoard from '../components/User/TeacherDashboard';

function Dashboard(props) {
    return (
        <div>
            <Topbar />
            <TeacherDashBoard />
        </div>
    );
}

export default Dashboard;