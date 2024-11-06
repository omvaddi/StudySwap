import React, { useState } from 'react';
import axios from 'axios';
import UploadFile from '../Components/UploadFile';

const Upload = () => {
    return (
        <div>
            <h2>Upload File</h2>
            <UploadFile />
        </div>
    );
};

export default Upload;