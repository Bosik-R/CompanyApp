const mongoose = require('mongoose');

const departmentsSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('Department', departmentsSchema);