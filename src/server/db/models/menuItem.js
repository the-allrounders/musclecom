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
});

export default mongoose.model('menuItem', Schema);
