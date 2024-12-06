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
            <Sidebar />
            <div className="content">
                <div>
                    {user ? (
                        <h1 style={{ fontSize: '50px' }}>Welcome, {user.name}!</h1>
                    ) : (
                        <h1 style={{ fontSize: '50px' }}>Please Log In</h1>
                    )}
                </div>
                <div style={{ padding: '16px' }}>
                    {user ? (
                        <h1 style={{ marginTop: '32px', marginBottom: '16px' }}>Your Uploaded Files</h1>
                    ) : (
                        <h1 style={{ fontSize: '50px' }}></h1>
                    )}
                    
                    {files.length > 0 ? (
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                                gap: '16px',
                            }}
                        >
                            {files.map((file, index) => {
                                const { filename, metadata } = file || {};
                                if (!filename) {
                                    console.warn("Invalid file data at index:", index, file);
                                    return null; // Skip invalid file entries
                                }
                                return (
                                    <div
                                        key={filename}
                                        style={{
                                            backgroundColor: '#ffffff',
                                            borderRadius: '8px',
                                            padding: '8px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <img
                                            src={`http://localhost:3001/file/${filename}`} // File URL
                                            alt={filename}
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                borderRadius: '4px',
                                                marginBottom: '8px',
                                            }}
                                        />
                                        <p
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: 'bold',
                                                marginBottom: '8px',
                                            }}
                                        >
                                            {filename}
                                            <br />
                                            Uploaded by: {metadata.uploader}
                                        </p>
                                        <button
                                            style={{
                                                padding: '8px',
                                                backgroundColor: '#4CAF50',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                width: '90px', 
                                                height: '32px', 
                                            }}
                                            onClick={() => downloadFile(filename)}
                                        >
                                            Download
                                        </button>
                                        <button
                                            style={{
                                                padding: '8px 16px',
                                                backgroundColor: '#FF5733', // Red color for delete
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                width: '90px', 
                                                height: '32px', 
                                                marginLeft: '8px',
                                            }}
                                            onClick={() => deleteFile(filename)} // Call delete function
                                        >
                                            Delete
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p style={{ color: '#666', fontStyle: 'italic' }}></p>
                    )}
                </div>
                <SignOut />
            </div>
        </div>
    );
}

export default Profile;
