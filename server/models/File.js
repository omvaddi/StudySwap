const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const fileSchema = new Schema({
    file_size: Number,
    file_name: String,
    file_type: String,
    file_content: Buffer
});

module.exports = model('FileModel', fileSchema);
