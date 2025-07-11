const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  stock: {
    type: Number,
    required: true,
  },
  care: {
    type: String,
  },
  imageUrl: {
    type: String, // Store image filename or URL
  },
  featured: {
  type: Boolean,
  default: false,
},
}, {
  timestamps: true, // adds createdAt and updatedAt
});

module.exports = mongoose.model('Plant', plantSchema);
