const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String, 
    required: true, 
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String, 
    required: true,
    trim: true,
    minlength: 6
  },
  registrationDate: {
    type: Date,
    default: Date.now()
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);