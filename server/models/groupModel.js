const mongoose = require('mongoose');

// Define the schema for the group collection
const groupSchema = new mongoose.Schema({
    name: String,
    code: String,
    dateCreated: Date,
});
  
const GroupModel = mongoose.model('Group', groupSchema);

module.exports = GroupModel;