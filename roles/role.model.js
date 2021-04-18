const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    roleName: { type: String, unique: true, required: true },   
    roleDescription: { type: String},    
    roleStatus: {type: Number, default: 1},
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Role', schema);