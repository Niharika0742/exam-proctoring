const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true  // Storing as plain text (not recommended)
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  preferredName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);
