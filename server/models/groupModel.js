const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: String,
    code: String,
    dateCreated: Date,
});
  
const GroupModel = mongoose.model('Group', groupSchema);
module.exports = GroupModel;