const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/dy');

module.exports = mongoose;