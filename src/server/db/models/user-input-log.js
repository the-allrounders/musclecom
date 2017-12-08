import mongoose from 'mongoose';

// Define a schema
const Schema = mongoose.Schema({
  menuItemID: {
    type: String,
  },
  timeStamp: {
    type: Date,
  },
});

export default mongoose.model('user-input-log', Schema);
