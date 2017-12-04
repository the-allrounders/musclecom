import mongoose from 'mongoose'

// Define a schema
const Schema = mongoose.Schema({
  sensor: {
    type: String,
  },
  date: {
    type: Date,
  },
  value: {
    type: Boolean,
  },
});

export default mongoose.model('processed-sensor-log', Schema);
