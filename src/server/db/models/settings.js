import mongoose from 'mongoose'

// Define a schema
const Schema = mongoose.Schema({
  key: {
    type: String,
  },
  value: {
    type: String,
  },
});

export default mongoose.model('settings', Schema);
