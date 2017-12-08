import mongoose from 'mongoose';

// Define a schema
const Schema = mongoose.Schema({
  sensor: {
    type: String,
  },
  date: {
    type: Date,
  },
  value: {
    type: Number,
  },
});

export default mongoose.model('raw-sensor-log', Schema);
