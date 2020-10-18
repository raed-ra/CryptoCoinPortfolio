import React from 'react';
import PublicMaster from './layout/public/PublicMaster';
import Dashboard from './layout/public/Dashboard';



function Home(props) {

    return (
        <PublicMaster style={{ height: "100%" }}>
            <Dashboard />
    
        </PublicMaster>
    );
}

export default Home;