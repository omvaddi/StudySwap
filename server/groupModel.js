const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = Schema({
    name: String,
    code: String,
});
  
const Group = mongoose.model('Group', groupSchema);
module.exports = Group;