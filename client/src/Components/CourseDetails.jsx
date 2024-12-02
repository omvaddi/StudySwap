import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UploadNote from '../Components/UploadNote'; // Keeping the UploadNote component for file uploads
import axios from 'axios';
import { UserContext } from '../Context/UserContext';

const CourseDetails = () => {
    const { courseId } = useParams();
    const [files, setFiles] = useState([]);
    const { user } = useContext(UserContext);

    // Fetch files from the backend
    const fetchFiles = async () => {
        try {
            console.log("Fetching files...");
            const response = await axios.get('http://localhost:3001/files'); // API route for fetching files
            if (response.data && Array.isArray(response.data)) {
                console.log("Fetched files:", response.data); // Debugging fetched data
                // Filter files by matching courseId
                const filteredFiles = response.data.filter(
                    (file) => file.metadata?.courseId === courseId
                );
                console.log("Filtered files:", filteredFiles);
                setFiles(filteredFiles);
            } else {
                console.error('Unexpected response format:', response.data);
            }
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, [courseId]);

    // Callback to add a new file to the files state
    const addFile = (newFile) => {
        setFiles((prevFiles) => [...prevFiles, newFile]);
    };

    // Function to handle file download
    const downloadFile = (filename) => {
        const link = document.createElement('a');
        link.href = `http://localhost:3001/file/${filename}`;
        link.setAttribute('download', filename);
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div style={{ padding: '16px' }}>
            <h1>{user?.name || "Guest"}</h1>
            <h1 style={{ marginBottom: '16px' }}>Course Details for {courseId}</h1>
            
            <UploadNote
                courseId={courseId}
                username={user?.name || "Guest"}
                onUploadSuccess={addFile}
            /> {/* Pass addFile as a prop */}
            
            <button
                style={{
                    marginTop: '16px',
                    padding: '10px 20px',
                    backgroundColor: '#007BFF',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
                onClick={fetchFiles} // Trigger the fetchFiles function
            >
                Refresh Files
            </button>
            
            <div>
                <h2 style={{ marginTop: '32px', marginBottom: '16px' }}>Uploaded Files</h2>
                {files.length > 0 ? (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                            gap: '16px',
                        }}
                    >
                        {files.map((file, index) => {
                            const { filename,metadata } = file || {};
                            if (!filename) {
                                console.warn("Invalid file data at index:", index, file);
                                return null; // Skip invalid file entries
                            }

                            return (
                                <div
                                    key={filename}
                                    style={{
                                        border: '1px solid #ccc',
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
                                        {filename}<br />Uploaded by: {metadata.uploader}
                                        
                                    </p>
                                
                                    <button
                                        style={{
                                            padding: '8px 16px',
                                            backgroundColor: '#4CAF50',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => downloadFile(filename)}
                                    >
                                        Download
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p style={{ color: '#666', fontStyle: 'italic' }}>No files uploaded yet.</p>
                )}
            </div>
        </div>
    );
};

export default CourseDetails;
