const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const UserModel = require("./models/User");
const Group = require("./groupModel");

const app = express()
app.use(express.json())
app.use(cors())

const mongoURI = "mongodb://localhost:27017/user";

const conn = mongoose.createConnection(mongoURI);

let gfs;

conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
});

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return {
            filename: Date.now() + "-" + file.originalname, 
            bucketName: "uploads",
        };
    },
});

const upload = multer({ storage });

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("Success")
            }
            else {
                res.json("Password is incorrect.")
            }
        }
        else{
            res.json("No account found.")
        }
    })
})

app.post('/register', (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err =>res.json(err))
})

app.post('/api/group', (req, res) => {
    const newGroup = new Group({
        name: req.body.name,
        code: req.body.code,
    });
      
    newGroup.save()
        .then(group => res.status(201).json(group));
  });

app.post("/upload", upload.single("file"), (req, res) => {
     if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }
    res.status(201).json({ file: req.file, message: "File uploaded successfully" });
});

app.get("/file/:filename", (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (err) {
            console.error("Error fetching file: ", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (!file || file.length === 0) {
            return res.status(404).json({ message: "No file found" });
        }

        if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            return res.status(404).json({ message: "Not an image file" });
        }
    });
});

app.listen(3001, () => {
    console.log("server is running")
})