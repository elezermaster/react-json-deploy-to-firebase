import React from "react";
import useMockData from '../utils/mockData'

const Main = () => {
    const {error, initialize, progress, status} = useMockData()
    const handleClick = () => {
        console.log("initialization")
        initialize()
    }
    return (
        <>
        <h1> Main Page</h1>
        <h3>Initialization data on Firebase</h3>
        <ul>
            <li>Status: {status}</li>
            <li>Progress: {progress}%</li>
            {error && <li>Error: {error}</li>}
        </ul>
        <button className="btn btn-primary" onClick={handleClick}>initialize data</button>
        </>
    )
};

export default Main;
