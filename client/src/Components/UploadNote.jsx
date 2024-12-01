import React, { useState } from 'react';
import axios from 'axios';

const UploadNote = ({courseId}) => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [metadata, setMetadata] = useState({
        title: '',
        description: '',
        tags: '',
    });

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleMetadataChange = (e) => {
        console.log('handleMetadata!');
        setMetadata({
            ...metadata,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        console.log('handleUpload');
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', metadata.title);
        formData.append('description', metadata.description);
        formData.append('tags', 'tag1');
        try {
            const response = await axios.post('http://localhost:3001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('File and metadata uploaded successfully!');
            console.log(response.data);
        } catch (error) {
            setMessage('Error uploading file and metadata. Please try again.');
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleUpload}>
                <input type="file" onChange={handleFileChange} />
                <input
                    type="text"
                    name="title"
                    placeholder="Enter title"
                    value={metadata.title}
                    onChange={handleMetadataChange}
                />
                <textarea
                    name="description"
                    placeholder="Enter description"
                    value={metadata.description}
                    onChange={handleMetadataChange}
                ></textarea>
                <input
                    type="text"
                    name="tags"
                    placeholder="Enter tags (comma-separated)"
                    value={metadata.tags}
                    onChange={handleMetadataChange}
                />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadNote;
