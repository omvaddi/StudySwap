const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const { MongoClient, GridFSBucket } = require("mongodb");
const UserModel = require("./models/userModel");
const GroupModel = require("./models/groupModel");

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Allow only your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  }));

const mongoURI = "mongodb://localhost:27017/user";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let bucket;

conn.once("open", () => {
    // Create a GridFSBucket instance using the connection
    bucket = new GridFSBucket(conn.db, {
        bucketName: "uploads",
    });
});

const storage = multer.memoryStorage(); // Store files in memory, will upload to GridFS in the endpoint

const upload = multer({ storage });

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    const { password, ...userWithoutPassword } = user.toObject();
                    res.json({ message: "Success", user: userWithoutPassword });
                } else {
                    res.json("Password is incorrect.");
                }
            } else {
                res.json("No account found.");
            }
        })
        .catch(err => res.json(err));
});

app.post('/register', (req, res) => {
    UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.post('/api/group', (req, res) => {
    GroupModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.get('/api/groups', (req, res) => {
    GroupModel.find()
        .then(groups => res.json(groups))
        .catch(err => res.status(500).json({ message: "Error fetching groups", error: err }));
});

app.post("/upload", upload.single("file"), (req, res) => {
    console.log(req.body);
    console.log(req.body.courseId);
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }
    const courseId = req.body.courseId;
    // Upload file to GridFS
    const uploadStream = bucket.openUploadStream(Date.now() + "-" + req.file.originalname, {
        metadata: {
            courseId: courseId // Add courseId as metadata
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

app.get("/file/:filename", (req, res) => {
    const filename = req.params.filename;

    // Fetch the file's metadata from GridFS to get the contentType
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

app.get('/files', (req, res) => {
    // Fetch all file metadata from GridFS
    conn.db.collection('uploads.files').find().toArray((err, files) => {
        if (err) {
            return res.status(500).json({ message: "Error fetching files.", error: err });
        }
        if (!files || files.length === 0) {
            return res.status(404).json({ message: "No files found." });
        }
        // Files found, return an array of file metadata
        res.json(files);
    });
});

app.listen(3001, () => {
    console.log("server is running");
});
