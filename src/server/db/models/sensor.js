import mongoose from 'mongoose';

// Define a schema
const Schema = mongoose.Schema({
  name: {
    type: String,
  },
  min: {
    type: Number,
  },
  max: {
    type: Number,
  },
  channel: {
    type: Number,
  },
});

export default mongoose.model('sensor', Schema);
