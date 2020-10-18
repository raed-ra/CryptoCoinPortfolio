import React from 'react';
import { NavigationBar } from './Navbar';
import { Jumbotron } from './Jumbotron';
import { Layout } from './Layout';


function PublicMaster(props) {


    return (
        <main {...props}>
            <NavigationBar />
            <Jumbotron />
            <Layout />

            {props.children}

        </main>
    );

}

export default PublicMaster;
