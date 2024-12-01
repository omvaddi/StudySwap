import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UploadNote from '../Components/UploadNote';  // Keeping the UploadNote component for file uploads
import axios from 'axios';

const CourseDetails = () => {
    const { courseId } = useParams();
    const [files, setFiles] = useState([]);

    // Fetch files from the backend
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                console.log("Fetching files...");
                const response = await axios.get('http://localhost:3001/files'); // API route for fetching files
                if (response.data && Array.isArray(response.data)) {
                    console.log("Fetched files:", response.data); // Debugging fetched data
                    setFiles(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        fetchFiles();
    }, []);

    // Function to handle file download
    const downloadFile = (filename) => {
        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = `http://localhost:3001/file/${filename}`;  // Ensure this is the correct file download route
        link.setAttribute('download', filename);  // This ensures that the file is downloaded with the correct filename
        link.style.display = 'none';  // Optionally, hide the link from view
        document.body.appendChild(link);
        link.click();  // Programmatically click the link to start the download
        document.body.removeChild(link);  // Clean up the DOM
    };

    return (
        <div style={{ padding: '16px' }}>
            <h1 style={{ marginBottom: '16px' }}>Course Details for {courseId}</h1>
            <UploadNote courseId={courseId} />  {/* Keeping the file upload section */}
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
                            const { filename } = file || {};
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
                                        {filename}
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
