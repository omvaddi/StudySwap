import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';
import UploadFile from '../Components/UploadFile';

const Upload = () => {
    return (
        <div>
            <Sidebar />
            <div className="content">
                <h2>Upload File</h2>
                <UploadFile />
            </div>
        </div>
    );
};

export default Upload;