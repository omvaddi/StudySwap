import React from 'react';
import Sidebar from '../Components/Sidebar';
import './Home.css';

function Home() {
    return (
        <div className="App">
        <Sidebar />
        <div className="content">
            <h1>Welcome to the Main Content Area</h1>
            <p>This is the main content of the page.</p>
        </div>
        </div>
    );
}

export default Home;

