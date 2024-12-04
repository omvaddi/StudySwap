const FileModel = require('./models/File');
const fs = require("fs").promises;

async function verify_file(file) {
    const file_buffer = await fs.readFile(file);
    const size = file_buffer.length / 1000000.0;
    const file_extension = file.search(".");

    console.log(size);
    console.log(file.substring(file_extension));

    if (size > 10) {
        return false;
    }

    if (file.search(".pdf") == -1 && file.search(".png") == -1) {
        return false;
    }


    const new_file = new FileModel({
        file_size: size,
        file_name: file,
        file_type: file.substring(file_extension),
        file_content: file_buffer
    });
    console.log(new_file);
    try {
        await new_file.save();
        console.log("File saved successfully!");
        return true;
    } catch (error) {
        console.error("Error saving the file:", error);
        return false;
    }
}

module.exports = verify_file;
