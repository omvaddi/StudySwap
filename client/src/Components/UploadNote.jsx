import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';

const UploadNote = ({ courseId, username, onUploadClick }) => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const { user } = useContext(UserContext);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

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
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadNote;
