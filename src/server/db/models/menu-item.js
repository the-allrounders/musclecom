import mongoose from 'mongoose'

// Define a schema
const Schema = mongoose.Schema({
  parent: {
    type: String,
  },
  name: {
    type: String,
  },
  icon: {
    type: String,
  },
  order: {
    type: Number,
  },
});

export default mongoose.model('menu-item', Schema);
