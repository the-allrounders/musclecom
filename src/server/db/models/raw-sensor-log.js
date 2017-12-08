import mongoose from 'mongoose';

// Define a schema
const Schema = mongoose.Schema({
  sensor: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  value: {
    type: Number,
  },
});

export default mongoose.model('raw-sensor-log', Schema);
