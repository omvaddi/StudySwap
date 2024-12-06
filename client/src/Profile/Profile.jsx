import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
import Sidebar from '../Components/Sidebar';
import SignOut from '../Components/SignOut';

function Profile() {
    const { user } = useContext(UserContext); // Get user from UserContext
    const [files, setFiles] = useState([]); // State to store the files

    // Fetch files uploaded by the logged-in user
    const fetchFiles = async () => {
        try {
            console.log("Fetching files...");
            const response = await axios.get('http://localhost:3001/files'); // API route for fetching files
            if (response.data && Array.isArray(response.data)) {
                console.log("Fetched files:", response.data); // Debugging fetched data
                // Filter files by matching uploader name
                const userFiles = response.data.filter(
                    (file) => file.metadata?.uploader === user?.name
                );
                console.log("Filtered files for user:", userFiles);
                setFiles(userFiles); // Update the files state with filtered files
            } else {
                console.error('Unexpected response format:', response.data);
            }
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchFiles(); // Fetch files when the user is available
        }
    }, [user]);

    // Function to handle file download
    const downloadFile = (filename) => {
        const link = document.createElement('a');
        link.href = `http://localhost:3001/file/${filename}`; // API route for downloading file
        link.setAttribute('download', filename); // Set the download attribute
        link.style.display = 'none';
        document.body.appendChild(link); // Append link to the body
        link.click(); // Programmatically click the link to trigger download
        document.body.removeChild(link); // Remove the link from the body
    };

    // Function to handle file deletion
    const deleteFile = async (filename) => {
        try {
            await axios.delete(`http://localhost:3001/file/${filename}`); // API route for deleting file
            setFiles((prevFiles) => prevFiles.filter((file) => file.filename !== filename)); // Update the files state
            console.log(`File ${filename} deleted successfully`);
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    return (
        <div>
            <Sidebar /> {/* Sidebar component */}
            <div className="content">
                <h1>Profile</h1>
                <SignOut /> {/* SignOut component */}
                <h2>Uploaded Files</h2>
                {files.length > 0 ? (
                    <ul>
                        {files.map((file) => (
                            <li key={file.filename}>
                                {file.filename}
                                <button onClick={() => downloadFile(file.filename)}>Download</button>
                                <button onClick={() => deleteFile(file.filename)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No files uploaded yet.</p>
                )}
            </div>
        </div>
    );
}

export default Profile;
