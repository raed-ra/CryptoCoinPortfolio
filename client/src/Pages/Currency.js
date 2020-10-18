import React from 'react';
import PublicMaster from './layout/public/PublicMaster';
import CurrencyCharts from './layout/public/CurrencyCharts';


function Home(props) {

    return (
        <PublicMaster style={{ height: "100%" }}>
            <CurrencyCharts />
           

        </PublicMaster>
    );
}

export default Home;