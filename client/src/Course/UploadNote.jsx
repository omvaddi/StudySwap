import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';

const UploadNote = ({ courseId, username, onUploadClick }) => {
    const [file, setFile] = useState(null); // State to store the selected file
    const [message, setMessage] = useState(''); // State to store the message
    const { user } = useContext(UserContext); // Get user from UserContext

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Update the file state when a file is selected
    };

    const handleUpload = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        if (!courseId) {
            setMessage('Course ID is missing!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('courseId', courseId); // Append courseId as metadata
        formData.append('uploader', username);

        // Trigger callback when upload starts
        if (onUploadClick) {
            onUploadClick();
        }

        try {
            const response = await axios.post('http://localhost:3001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage('File uploaded successfully!');
            console.log(response.data);
        } catch (error) {
            setMessage('Error uploading file. Please try again.');
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleUpload}>
                <input type="file" onChange={handleFileChange} /> {/* Input to select a file */}
                <button type="submit">Upload</button> {/* Button to submit the form */}
            </form>
            {message && <p>{message}</p>} {/* Display the message if it exists */}
        </div>
    );
};

export default UploadNote;
