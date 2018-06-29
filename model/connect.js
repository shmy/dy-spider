const mongoose = require('mongoose');
const os = require('os');
const address = os.platform() === 'linux' ? '172.17.0.1' : 'localhost'
mongoose.connect(`mongodb://${address}:27017/dy`);

module.exports = mongoose;