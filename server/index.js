const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const UserModel = require("./models/userModel");
const GroupModel = require("./models/groupModel");

const app = express()
app.use(express.json())
app.use(cors())

const mongoURI = "mongodb://localhost:27017/user";

mongoose.connect(mongoURI);

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
                const { password, ...userWithoutPassword } = user.toObject();
                res.json({ message: "Success", user: userWithoutPassword })
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
    GroupModel.create(req.body)
    .then(users => res.json(users))
    .catch(err =>res.json(err))
  })

app.get('/api/groups', (req, res) => {
    GroupModel.find()
        .then(groups => res.json(groups))
        .catch(err => res.status(500).json({ message : "Error fetching groups", error: err}))
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

app.put('/api/user/:_id', (req, res) => {
    const userId = req.params._id; 
    const { classes } = req.body; 

    UserModel.findByIdAndUpdate(
        userId, 
        { classes }, 
        { new: true }
    )
    .then(updatedUser => {
        res.json(updatedUser);
    })
    .catch(err => {
        res.status(500).json({ message: "Error updating user classes", error: err });
    });
});

app.listen(3001, () => {
    console.log("server is running")
})