const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const { MongoClient, GridFSBucket } = require("mongodb");
const UserModel = require("./models/userModel");
const GroupModel = require("./models/groupModel");
require('dotenv').config(); 

// Initialize Express app and configure middleware
const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
  }));

// Connect to MongoDB using Mongoose
// Use .env to get the MongoDB URI
const mongoURI = process.env.mongoURI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Create a GridFSBucket instance using the connection
let bucket;

conn.once("open", () => {
    bucket = new GridFSBucket(conn.db, {
        bucketName: "uploads",
    });
});

// Configure multer to store files
const storage = multer.memoryStorage(); 

const upload = multer({ storage });

// Endpoint for login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    const { password, ...userWithoutPassword } = user.toObject();
                    res.json({ message: "Success", user: userWithoutPassword });
                } else {
                    res.json({message: "Password is incorrect."});
                }
            } else {
                res.json({message: "No account found."});
            }
        })
        .catch(err => res.json(err));
});

// Endpoint for registration
app.post('/register', (req, res) => {
    UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

// Endpoint to create a new class
app.post('/api/group', (req, res) => {
    GroupModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

// Endpoint to get all classes
app.get('/api/groups', (req, res) => {
    GroupModel.find()
        .then(groups => res.json(groups))
        .catch(err => res.status(500).json({ message: "Error fetching groups", error: err }));
});

// Endpoint to upload a file
app.post("/upload", upload.single("file"), (req, res) => {
    console.log(req.body);
    console.log(req.body.courseId);
    console.log(req.body.uploader);
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }
    const courseId = req.body.courseId;
    const uploader=req.body.uploader;
    // Upload file to GridFS
    const uploadStream = bucket.openUploadStream(Date.now() + "-" + req.file.originalname, {
        metadata: {
            courseId: courseId, // Add courseId as metadata
            uploader: uploader
        }
    });
    
    uploadStream.write(req.file.buffer);
    uploadStream.end();

    uploadStream.on("finish", () => {
        res.status(201).json({
            file: {
                filename: uploadStream.filename,
                id: uploadStream.id,
                contentType: req.file.mimetype
            },
            message: "File uploaded successfully"
        });
    });

    uploadStream.on("error", (err) => {
        res.status(500).json({ message: "Error uploading file", error: err });
    });
});

// Endpoint to download a file
app.get("/file/:filename", (req, res) => {
    const filename = req.params.filename;

    // Fetch file metadata from GridFS to get the contentType
    const file = bucket.find({ filename: filename }).toArray((err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching file metadata', error: err });
        }

        if (!files || files.length === 0) {
            return res.status(404).json({ message: 'File not found' });
        }

        const fileMetadata = files[0];
        const contentType = fileMetadata.contentType || 'application/octet-stream'; // Default to binary if no content type

        // Set the Content-Type header
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

        // Open the download stream and pipe it to the response
        const downloadStream = bucket.openDownloadStreamByName(filename);

        downloadStream.pipe(res);

        downloadStream.on("error", (err) => {
            res.status(404).json({ message: "File not found", error: err });
        });
    });
});

// Endpoint to update user classes
app.put('/api/user/:_id', (req, res) => {
    const userId = req.params._id;
    const { classes } = req.body;

    UserModel.findByIdAndUpdate(userId, { classes }, { new: true })
        .then(updatedUser => {
            res.json(updatedUser);
        })
        .catch(err => {
            res.status(500).json({ message: "Error updating user classes", error: err });
        });
});

// Endpoint to get all file metadata from GridFS
app.get('/files', (req, res) => {
    conn.db.collection('uploads.files').find().toArray((err, files) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching files.", error: err });
        }
        if (!files || files.length === 0) {
            return res.status(404).json({ message: "No files found." });
        }
        // Return an array of file metadata
        res.json(files);
    });
});

// Function to delete a file by its ID
async function deleteFile(fileId) {
    console.log("deleteFile");
    try {
        const response = await fetch(`http://localhost:3001/file/${fileId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('File deleted successfully');
        } else {
            const data = await response.json();
            console.error(data.message);
        }
    } catch (error) {
        console.error('Error deleting file:', error);
    }
}

// Route to delete a file from GridFS by file ID
app.delete('/file/:filename', async (req, res) => {
    const { filename } = req.params;  // Get the filename from the request parameters
    console.log("Received filename:", filename);

    try {
        // Find the file metadata using the filename
        const file = await bucket.find({ filename }).toArray();

        if (!file || file.length === 0) {
            return res.status(404).json({ message: "File not found" });
        }

        // File exists, proceed to delete it
        await bucket.delete(file[0]._id);  // Use the file's _id to delete the file

        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error("Error deleting file:", error);
        res.status(500).json({ message: "Error deleting file", error });
    }
});

// Start server on port 3001
app.listen(3001, () => {
    console.log("server is running");
});