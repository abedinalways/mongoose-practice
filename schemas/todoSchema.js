const mongoose = require('mongoose');
const todoSchema = mongoose.Schema({
  title: {
    type: String, required: true,
  },
  description: String,
  status: {
    type: String,
    enum:['active', 'inactive']
  },
  date: {
    type: Date,
    Default: Date.now,
  }
});
module.exports = todoSchema;
