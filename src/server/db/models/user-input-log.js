import mongoose from 'mongoose';

// Define a schema
const Schema = mongoose.Schema({
  menuItemID: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('user-input-log', Schema);
