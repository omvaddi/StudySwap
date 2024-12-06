import React, { useState } from 'react';
import axios from 'axios';

const UploadFile = () => {
    const [file, setFile] = useState(null); // State to store the selected file
    const [message, setMessage] = useState(''); // State to store the message

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Update the file state when a file is selected
    };

    const handleUpload = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file); // Append the selected file to the form data

        try {
            const response = await axios.post('http://localhost:3001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('File uploaded successfully!');
            console.log(response.data); // Log the response data
        } catch (error) {
            setMessage('Error uploading file. Please try again.');
            console.error(error); // Log the error
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

export default UploadFile;